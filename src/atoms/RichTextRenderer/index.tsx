import React from "react";
// import DOMPurify from "isomorphic-dompurify";
import styles from "./RichTextRenderer.module.css";

const InsertHtml = ({ html }: { html: string }) => {
  // const sanitizedHtml = DOMPurify.sanitize(html);

  return (
    <div
      className={styles.wrapper}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default InsertHtml;
