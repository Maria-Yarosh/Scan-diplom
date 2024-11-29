import { ChangeEvent, Fragment, useState } from "react";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { fetchDocuments, updateDocuments } from "../../redux/slices/document/documentSlice";
import { IRequestDocumentData } from "../../interfaces/documents";
import { convertDocument } from "./helpers/convertDocument";
import { EFieldName, TFieldValue, TFormData } from "./interfaces";
import { FormField, TFormField } from "../../components/FormField/FormField";
import { useNavigate } from "react-router-dom";
import { EPage } from "../../router";
import {
  selectDocumentError,
  selectIsDocumentLoading,
  selectSearchDocuments,
} from "../../redux/slices/document/selectors";
import { AlertWrapper, EAlertType } from "../../components/AlertWrapper/AlertWrapper";

import style from "../SearchDocument/SearchDocument.module.scss";
import { Button, EButtonSize, EButtonType } from "../../components/Button/Button";

const formSchema = z.object({
  [EFieldName.INN]: z.coerce
    .string()
    .regex(/^\d{10}$/, { message: "ИНН должен состоять из 10 цифр" })
    .transform(Number),
  [EFieldName.Tone]: z.string().optional(),
  [EFieldName.DocumentCount]: z.coerce
    .number({ message: "Поле должно содержать только числа" })
    .min(1, { message: "Минимум 1" })
    .max(1000, { message: "Макисмум 1000" }),
  [EFieldName.DateRange]: z
    .object({
      start: z.string(),
      end: z.string(),
    })
    .optional(),
  [EFieldName.MaxCompleteness]: z.boolean().optional(),
  [EFieldName.BusinessContext]: z.boolean().optional(),
  [EFieldName.MainRole]: z.boolean().optional(),
  [EFieldName.RiskFactors]: z.boolean().optional(),
  [EFieldName.TechNews]: z.boolean().optional(),
  [EFieldName.Announcements]: z.boolean().optional(),
  [EFieldName.NewsDigest]: z.boolean().optional(),
});

//type TSchemaProps = z.infer<typeof formSchema>;

const fieldLabels = new Map<EFieldName, string>([
  [EFieldName.INN, "ИНН компании"],
  [EFieldName.Tone, "Тональность"],
  [EFieldName.DocumentCount, "Количество документов в выдаче"],
  [EFieldName.DateRange, "Диапазон поиска"],
  [EFieldName.MaxCompleteness, "Признак максимальной полноты"],
  [EFieldName.BusinessContext, "Упоминания в бизнес-контексте"],
  [EFieldName.MainRole, "Главная роль в публикации"],
  [EFieldName.RiskFactors, "Публикации только с риск-факторами"],
  [EFieldName.TechNews, "Включать технические новости рынков"],
  [EFieldName.Announcements, "Включать анонсы и календари"],
  [EFieldName.NewsDigest, "Включать сводки новостей"],
]);

const formFields: TFormField[] = [
  {
    name: EFieldName.INN,
    type: "text",
    required: true,
    placeholder: "10 цифр",
  },
  {
    name: EFieldName.Tone,
    type: "select",
    options: [
      { value: "any", label: "Любая" },
      { value: "positive", label: "Позитивная" },
    ],
  },
  {
    name: EFieldName.DocumentCount,
    type: "text",
    required: true,
    placeholder: "От 1 до 1000",
  },
  { name: EFieldName.DateRange, type: "dateRange", required: true },
  { name: EFieldName.MaxCompleteness, type: "checkbox" },
  { name: EFieldName.BusinessContext, type: "checkbox" },
  { name: EFieldName.MainRole, type: "checkbox" },
  { name: EFieldName.RiskFactors, type: "checkbox" },
  { name: EFieldName.TechNews, type: "checkbox" },
  { name: EFieldName.Announcements, type: "checkbox" },
  { name: EFieldName.NewsDigest, type: "checkbox" },
];

export type TFormErrors = {
  [K in EFieldName]?: string[];
};

export type ValidatedFormData = z.infer<typeof formSchema>;

const initialFormData: TFormData = {
  [EFieldName.INN]: "",
  [EFieldName.Tone]: "any",
  [EFieldName.DocumentCount]: "",
  [EFieldName.DateRange]: { start: "", end: "" },
  [EFieldName.MaxCompleteness]: false,
  [EFieldName.BusinessContext]: false,
  [EFieldName.MainRole]: false,
  [EFieldName.RiskFactors]: false,
  [EFieldName.TechNews]: false,
  [EFieldName.Announcements]: false,
  [EFieldName.NewsDigest]: false,
};

const leftFiedls = [EFieldName.INN, EFieldName.Tone, EFieldName.DocumentCount, EFieldName.DateRange];

const rightFiedls = [
  EFieldName.MaxCompleteness,
  EFieldName.BusinessContext,
  EFieldName.MainRole,
  EFieldName.RiskFactors,
  EFieldName.TechNews,
  EFieldName.Announcements,
  EFieldName.NewsDigest,
];

export const SearchDocument = () => {
  const navigate = useNavigate();
  const searchDocuments = useAppSelector(selectSearchDocuments);
  const documentsError = useAppSelector(selectDocumentError);
  const [formData, setFormData] = useState<TFormData>(searchDocuments || initialFormData);
  const [formErrors, setFormErrors] = useState<TFormErrors | null>(null);
  const dispatch = useAppDispatch();
  const documentLoading = useAppSelector(selectIsDocumentLoading);
  const handleChange = (name: string, value: TFieldValue) => {
    setFormData((prev) => {
      const updatedFormData = { ...prev, [name]: value };
      return updatedFormData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const backendData: IRequestDocumentData = convertDocument(formData);
    await dispatch(fetchDocuments(backendData)).unwrap();
    console.log("Успешный ответ");

    dispatch(
      updateDocuments({
        documentSearchData: formData,
      })
    );
    navigate(`/${EPage.result}`);
  };

  const handleAlertClose = () => {
    dispatch(updateDocuments({ error: null }));
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const fieldName = e.target.name as EFieldName;
    const result = formSchema.safeParse(formData);
    const errors = result.success ? undefined : result.error.format();
    console.log({ result: result, errors: errors });

    setFormErrors((prev: TFormErrors | null) => {
      if (!prev && !errors) {
        return null;
      }
      const newErrors = { ...prev };

      if (errors?.[fieldName]?._errors) {
        newErrors[fieldName] = errors[fieldName]?._errors;
      } else {
        delete newErrors[fieldName];
      }

      return Object.keys(newErrors).length > 0 ? newErrors : null;
    });
  };
  console.log({ formErrors: formErrors });

  return (
    <div>
      <div className={style.header}>
        <div className={style.header_container}>
          <h1 className={style.main_headerText}>Найдите необходимые данные в пару кликов.</h1>
          <p>Задайте параметры поиска. Чем больше заполните, тем точнее поиск</p>
        </div>
        <div>
          <img src="src/assets/searchDocPage/Document.png"></img>
          <img src="src/assets/searchDocPage/Folders.png"></img>
        </div>
      </div>
      <div className={style.search_content}>
        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.left_fields}>
            {formFields
              .filter((field) => leftFiedls.includes(field.name))
              .map((field) => (
                <Fragment key={field.name}>
                  <FormField
                    field={field}
                    value={formData[field.name] || (field.type === "dateRange" ? { start: "", end: "" } : "")}
                    onChange={handleChange}
                    errors={formErrors?.[field.name] || null}
                    onBlur={handleBlur}
                    label={fieldLabels.get(field.name)}
                  />
                </Fragment>
              ))}
          </div>
          <div className={style.left_fields}>
            {formFields
              .filter((field) => rightFiedls.includes(field.name))
              .map((field) => (
                <Fragment key={field.name}>
                  <FormField
                    field={field}
                    value={formData[field.name] || (field.type === "dateRange" ? { start: "", end: "" } : "")}
                    onChange={handleChange}
                    errors={formErrors?.[field.name] || null}
                    onBlur={handleBlur}
                    label={fieldLabels.get(field.name)}
                  />
                </Fragment>
              ))}
            <Button isWaiting={documentLoading} text="Поиск" size={EButtonSize.medium} type={EButtonType.primary} />
          </div>
        </form>
        <div>
          <img src="src/assets/searchDocPage/Group 1171274244.png"></img>
        </div>
        {documentsError && (
          <AlertWrapper
            text={documentsError}
            handleAlertClose={handleAlertClose}
            type={EAlertType.error}
            title="Error"
          />
        )}
      </div>
    </div>
  );
};
