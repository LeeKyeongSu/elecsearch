import { useState } from "react";
import { Box, VStack, Textarea, Button, Heading, FormControl, HStack } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { useToast } from "@chakra-ui/react";

export default function ReviewCreate({ userId }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const toast = useToast();

  const handleSubmit = async () => {
    if (rating === 0 || reviewText.trim() === "") {
      toast({
        title: "작성 오류",
        description: "별점과 리뷰를 모두 작성해 주세요.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          rating,
          review: reviewText,
        }),
      });

      if (!response.ok) {
        throw new Error("네트워크 에러");
      }

      const data = await response.json();

      toast({
        title: "제출 성공",
        description: "리뷰가 성공적으로 제출되었습니다.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // 폼 초기화
      setRating(0);
      setReviewText("");
    } catch (error) {
      toast({
        title: "제출 실패.",
        description: "리뷰 제출 중 오류가 발생했습니다. 다시 시도해 주세요.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5} maxW="500px" mx="auto">
      <Heading as="h3" size="lg" mb={4}>
        리뷰
      </Heading>
      <VStack spacing={4} align="start">
        <FormControl id="rating">
          <HStack spacing={"2px"}>
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <Box
                  as="label"
                  key={index}
                  color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => setRating(ratingValue)}
                >
                  <FaStar
                    cursor="pointer"
                    size={24}
                    transition="color 200ms"
                  />
                </Box>
              );
            })}
          </HStack>
        </FormControl>

        <FormControl id="review">
          <Textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="리뷰내용"
            size="sm"
          />
        </FormControl>

        <Button colorScheme="teal" onClick={handleSubmit}>
          작성
        </Button>
      </VStack>
    </Box>
  );
}
