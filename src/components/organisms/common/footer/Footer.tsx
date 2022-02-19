import FooterView from '@/components/organisms/common/footer/FooterView';

const Footer: React.FC = props => {

  const viewProps = {
    ...props
  };

  return (
    <FooterView {...viewProps} />
  );

}

export default Footer;
