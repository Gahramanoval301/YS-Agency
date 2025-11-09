import parse from "html-react-parser";

interface IProps {
  data: string;
}
const HtmlParser = ({ data }: IProps) => {
  return <>{parse(data)}</>;
};

export default HtmlParser;
