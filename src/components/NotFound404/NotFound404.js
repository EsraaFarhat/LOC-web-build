import React, { Fragment } from "react";
import styles from "./NotFound404.module.css";
import { Link } from "react-router-dom";
export default function NotFound404() {
  return (
    <Fragment>
      <div className="contanier">
      <div className={styles.page404}>
        <div className={styles.outer}>
          <div className={styles.middle}>
            <div className={styles.inner}>
              <div className={styles.innerCircle}>
                <i className="fa fa-home"></i>
                <span>404</span>
              </div>
              <span className={styles.innerStatus}>Oops! You're lost</span>
              <span className={styles.innerDetail}>
                <p>We can not find the page you're looking for.</p>
                <Link to={"/home"} className="btn btn-info mtl">
                    <i className="fa fa-home"></i>&nbsp; Return home
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </Fragment>
  );
}
