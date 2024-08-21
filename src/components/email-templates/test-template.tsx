import {Button, Html} from "@react-email/components";
import {Heading} from "lucide-react";

const TestTemplate = ({ url }: any) => {
  return (
	<Html lang="en">
	  <Heading>Hello, world!</Heading>
	  <Button href={url}>click me!</Button>
	</Html>
  );
};

export default TestTemplate;
