import { Box, Rating, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Card = ({ bookId, title, bookRating, price, bookCover }) => {
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
          height: "470px",
          width: "300px",
          borderRadius: "8px",
        }}
      >
        <img
          //src="/assets/CategoryCover/HistoricalFiction.jpg"
          src={bookCover}
          alt={title}
          height="350px"
          width="300px"
          style={{
            cursor: "pointer",
            borderTopRightRadius: "8px",
            borderTopLeftRadius: "8px",
          }}
          onClick={() => navigate(`/book/${bookId}`)}
        />
        <Box sx={{ px: 2, py: 1 }}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Roboto",
              fontWeight: "700",
              fontSize: "18px",
              lineHeight: "20px",
              color: "#858585",
            }}
            gutterBottom
          >
            {title}
          </Typography>

          <Rating
            name="half-rating-read"
            defaultValue={bookRating}
            precision={0.1}
            readOnly
          />
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Roboto",
              fontWeight: "500",
              fontSize: "18px",
              color: "#black",
            }}
            gutterBottom
          >
            ₹{price}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Card;
