import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import {
  selectDocumentIds,
  selectDocuments,
  selectHisogramData,
  selectIsDocumentLoading,
  selectPaginationDocuments,
} from "../../redux/slices/document/selectors";
import { EPage } from "../../router";

import style from "./ArticleResultPage.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button, EButtonType } from "../../components";
import { fetchMoreDocuments } from "../../redux/slices/document/documentSlice";
import { Navigation, Pagination } from "swiper/modules";

export const ArticleResultPage = () => {
  const documents = useAppSelector(selectDocuments);
  const dispatch = useAppDispatch();
  const { currentPage, totalCounts } = useAppSelector(selectPaginationDocuments);
  const documentIds = useAppSelector(selectDocumentIds);
  const documentLoading = useAppSelector(selectIsDocumentLoading);

  const histogramData = useAppSelector(selectHisogramData)


  const totalDocuments =
  histogramData?.find(item => item.histogramType === 'totalDocuments')?.data || []
  const riskFactors =
  histogramData?.find(item => item.histogramType === 'riskFactors')?.data || []



const tranformedData = totalDocuments.map((item, index) => {
  return {
    date: new Date(item.date).toLocaleDateString(),
    all: item.value,
    risks: riskFactors[index].value || 0,
  }
})


const publications = tranformedData.reduce((result, item) => {
  return (result += item.all + item.risks)
}, 0)

  const handleLoadMoreDocument = (): void => {
    if (documentIds) {
      dispatch(fetchMoreDocuments({ encodedIds: documentIds, page: currentPage }));
    }
  };

  if (!documents || documents.length === 0) {
    return <div>No documents found</div>;
  }

  const hasMore = documents.length < (totalCounts || 0);

  console.log(tranformedData)

  const renderSearchText = () => {
    if (documents) {
      return null;
    } else {
      return (
        <div className={style.header}>
          <div>
            <h1>Ищем. Скоро будут результаты</h1>
            <p>Поиск может занять некоторое время, просим сохранять терпение.</p>
          </div>
          <img src="src/assets/articleResultPage/Group 1171274267.png"></img>
        </div>
      );
    }
  };

  return (
    <div>
      <Link to={`/${EPage.search}`}>Назад</Link>
      {renderSearchText()}
      <div>
        <h2>Общая сводка</h2>
        <p>Найдено {publications} вариантов</p>
        <div className={style.slider_conteiner}>
        <div className={style.header_slider}>
              <p>Период</p>
              <p>Всего</p>
              <p>Риски</p>
              </div>
        <Swiper 
        className={style.swiper}
        slidesPerView={3}
        spaceBetween={0}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}>
            {tranformedData?.map((item, index) => (
              <SwiperSlide>
              <div key={index} className={style.infoBlock_slider}>
                <p>{item.date}</p>
                <p>{item.all}</p>
                <p>{item.risks}</p>
              </div>
              </SwiperSlide>
            ))}
        </Swiper>
        </div>
      </div>
      <div>
        <h2>Список документов</h2>
        <div className={style.card_container}>
          {documents.map((document) => (
            <div key={document.id} className={style.card}>
              <h3>{document.title}</h3>
              {document.content && <div className={style.content_text} dangerouslySetInnerHTML={{ __html: document.content }} />}
              <Button type={EButtonType.secondary} text="Читать в источнике"></Button>
              <div className={style.wordCount}>{document.wordCount} слов</div>
            </div>
          ))}
        </div>
        {hasMore && (
          <div className={style.btn_conteiner}>
            <Button
              isWaiting={documentLoading}
              onClick={handleLoadMoreDocument}
              type={EButtonType.primary}
              text="Показать больше"
            />
          </div>
        )}
      </div>
    </div>
  );
};
