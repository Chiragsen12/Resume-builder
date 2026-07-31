import { Button, Flex, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ResumePreview from "./ResumePreview"; // Layout 1
import LayoutThree from "./LayoutThree";     // Layout 2
import LayoutFour from "./Layoutfour";       // Layout 3 (new)
import Layoutfive from "./Layoutfive";       // Layout 4 (new)

const LayoutPage = () => {
  const navigate = useNavigate();

  return (
    <Flex justify="center" gap={10} mt={8} alignItems="stretch" flexWrap="wrap">
      {/* Layout 1 */}  
      <VStack>
        <ResumePreview />
        <Button
          colorScheme="purple"
          mt={4}
          onClick={() => navigate("/builder?layout=1")}
        >
          Use Layout 1
        </Button>
      </VStack>

      {/* Layout 2 */}
      <VStack>
        <LayoutThree />
        <Button
          colorScheme="purple"
          mt={4}
          onClick={() => navigate("/builder?layout=2")}
        >
          Use Layout 2
        </Button>
      </VStack>

      {/* Layout 3 (New LayoutFour) */}
      <VStack>
        <LayoutFour />
        <Button
          colorScheme="purple"
          mt={4}
          onClick={() => navigate("/builder?layout=3")}
        >
          Use Layout 3
        </Button>
      </VStack>

      <VStack>
        <Layoutfive />
        <Button
          colorScheme="purple"
          mt={4}
          onClick={() => navigate("/builder?layout=4")}
        >
          Use Layout 4
        </Button>
      </VStack>
    </Flex>
  );
};

export default LayoutPage;
