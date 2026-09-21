import React, { useState, useEffect } from "react";
import styles from "./index.module.css";

export const EmptySubscribeBlock = () => {
    return (
        <section className={styles.wrapper}>
            <h3 className={styles.title}>Упс! Мы не нашли вашу подписку</h3>
            <h4 className={styles.subtitle}>Проверьте Ваш EMail или напишите в службу поддержки с указанием вашего EMail, на который был приобретен доступ - <a href="mailto:beunaffected@mail.ru">beunaffected@mail.ru</a></h4>
        </section>
    );
}