import React from 'react';

import { Card } from 'antd';
import CardTitle from '../../../CardTitle';

import Basic from './cards/Basic';
import Household from './cards/Household';
import Demographics from './cards/Demographics';
import Additional from './cards/Additional';
import SecondaryContact from './cards/SecondaryContact';
import Account from './cards/Account';

import styles from '../../../../../../styles/pages/apply.module.css';

export default function Index({ formValues, setStep }) {
  let props = { formValues, setStep };

  return (
    <Card title={<CardTitle percentage={80} title="Review Information" />}>
      <div className={styles.review}>
        <Basic step={0} {...props} />
        <Household step={1} {...props} />
        <Demographics step={2} {...props} />
        <Additional step={3} {...props} />
        <SecondaryContact step={5} {...props} />
      </div>
    </Card>
  );
}
