import React, { Fragment } from "react";
import styles from "./NotAuth.module.css";
import { Link } from "react-router-dom";
export default function NotAuth() {
  return (
    <Fragment>
      <div className="contanier">
        <div className={styles.page404}>
          <div className={styles.outer}>
            <div className={styles.middle}>
              <div className={styles.inner}>
                <div className={styles.innerCircle}>
                  <i className="fa fa-home"></i>
                  <span>401</span>
                </div>
                <span className={styles.innerStatus}>Oops! Not Authorized</span>
                <span className={styles.innerDetail}>
                  <p>Looks like you don't have a permission to see this page</p>
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
