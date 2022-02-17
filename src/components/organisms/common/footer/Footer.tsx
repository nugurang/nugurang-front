import FooterView from '@/src/components/organisms/common/footer/FooterView';

const Footer: React.FC = props => {

  const viewProps = {
    ...props
  };

  return (
    <FooterView {...viewProps} />
  );

}

export default Footer;
