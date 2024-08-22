import { Button, Html, Heading, Text } from "@react-email/components";

const TestTemplate = ({ url, html }: any) => {
  return (
    <Html lang="en">
      <Heading as="h1">Hello, world!</Heading>
      <Text>{html}</Text>
      <Button href={url}>click me!</Button>
    </Html>
  );
};

export default TestTemplate;
