import * as React from 'react';
import styles from './FormBuilder.module.scss';
import { IFormBuilderProps } from './IFormBuilderProps';
import { escape } from '@microsoft/sp-lodash-subset';
import App from './App';
import './temp.css';

export default class FormBuilder extends React.Component<IFormBuilderProps, {}> {
  public render(): React.ReactElement<IFormBuilderProps> {
    return (
      <div className={styles.formBuilder}>
        <App context={this.props.context} />
        {/* <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}
