import { FocusEventHandler } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Checkbox, FormControlLabel, MenuItem, Select, TextField } from "@mui/material";
import { EFieldName, TFieldValue } from "../../pages/SearchDocument/interfaces";
import style from "./FormField.module.scss";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

export type TFieldType = "text" | "select" | "checkbox" | "dateRange";

interface Option {
  value: string;
  label: string;
}

interface IBaseField {
  name: EFieldName;
  type: TFieldType;
  required?: boolean;
}

interface ITextField extends IBaseField {
  type: "text";
  placeholder?: string;
}

interface ISelectField extends IBaseField {
  type: "select";
  options: Option[];
}

interface ICheckboxField extends IBaseField {
  type: "checkbox";
}

interface IDateRangeField extends IBaseField {
  type: "dateRange";
}

export type TFormField = ITextField | ISelectField | ICheckboxField | IDateRangeField;

interface IFormFieldProps {
  field: TFormField;
  value: TFieldValue;
  onChange: (name: string, value: TFieldValue) => void;
  onBlur?: FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  errors?: string | string[] | null;
  label?: string;
}
export const FormField: React.FC<IFormFieldProps> = (props) => {
  const { field, value, onChange, errors, onBlur, label } = props;

  switch (field.type) {
    case "text":
      return (
        <FormControlLabel
          labelPlacement="start"
          control={
            <TextField
              type="text"
              value={value as string}
              onChange={(e) => onChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              error={Array.isArray(errors) ? errors.length > 0 : !!errors}
              helperText={
                <span className={style.error}>
                  {Array.isArray(errors) ? errors.map((error, index) => <span key={index}>{error}</span>) : errors}
                </span>
              }
              onBlur={onBlur}
              name={field.name}
              className={style.input}
            />
          }
          className={style.text_field}
          label={label}
        />
      );
    case "select":
      return (
        <FormControlLabel
          labelPlacement="start"
          control={
            <Select value={value} onChange={(e) => onChange(field.name, e.target.value)}>
              {field.options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          }
          label={label}
          className={style.text_field}
        />
      );
    case "checkbox":
      return (
        <FormControlLabel
          labelPlacement="start"
          control={<Checkbox checked={value as boolean} onChange={(e) => onChange(field.name, e.target.checked)} />}
          label={label}
          className={style.text_field}
        />
      );
    case "dateRange":
      { const dateValue = value as { start: string; end: string };

      return (
        <>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start date"
              value={dateValue.start ? dayjs(dateValue.start) : null}
              onChange={(newValue) => {
                onChange(field.name, {
                  ...dateValue,
                  start: newValue ? newValue.format("YYYY-MM-DD") : "",
                });
              }}
              format="DD-MM-YYYY"
            />
            <DatePicker
              label="End date"
              value={dateValue.end ? dayjs(dateValue.end) : null}
              onChange={(newValue) => {
                onChange(field.name, {
                  ...dateValue,
                  end: newValue ? newValue.format("YYYY-MM-DD") : "",
                });
              }}
              format="DD-MM-YYYY"
            />
          </LocalizationProvider>
        </>
      ); }
    default:
      return null;
  }
};
