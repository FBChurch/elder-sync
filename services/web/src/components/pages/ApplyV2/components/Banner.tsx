import useWindowDimensions from '../../../../utils/useWindowDimensions';

import goldStar from '../../../../assets/FP-star-gold.png';

import { Typography, Image } from 'antd';

import styles from '../../../../styles/pages/apply.module.css';

const { Title } = Typography;

const Banner = ({ title }) => {
  const { width } = useWindowDimensions();

  return (
    <div className={styles.banner}>
      <div style={{ width: '100%', display: 'flex', gap: '1rem' }}>
      </div>
    </div>
  );
};

export default Banner;
