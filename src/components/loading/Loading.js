import style from "./loading.module.css";

const Loading = () => {
  return (
    <div className={style.loading}>
      <div className={style.container}>
        <div className={style.loader}>
          <div className={style.bar1}></div>
          <div className={style.bar2}></div>
          <div className={style.bar3}></div>
          <div className={style.bar4}></div>
          <div className={style.bar5}></div>
          <div className={style.bar6}></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
