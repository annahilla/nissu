import CustomImageBackground from '../layout/CustomImageBackground';
import Spinner from './Spinner';

const LoadingScreen = () => {
  return (
    <CustomImageBackground>
      <Spinner />
    </CustomImageBackground>
  );
};

export default LoadingScreen;
