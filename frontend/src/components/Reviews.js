import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { createReview, removeReview } from "../redux/actions/review.actions";
import { REVIEW_CREATE_RESET } from "../redux/constants/review.constants";
import { DateTimeFilter } from "../filters/DateTimeFilter.js";
import { detailsOfProduct } from "../redux/actions/product.actions";
import Message from "../ui/components/Message";
import Rating from "../ui/components/Rating";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const Reviews = ({ productId, product }) => {
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  /*     const productDetails = useSelector((state) => state.productDetails);
    const { loading, product, error } = productDetails; */

  const reviewCreate = useSelector((state) => state.reviewCreate);
  const { error: errorCreatingReview, success: successCreatingReview } =
    reviewCreate;

  const reviewRemove = useSelector((state) => state.reviewRemove);
  const { error: errorRemovingReview, success: successRemovingReview } =
    reviewRemove;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successCreatingReview) {
      setRating(0);
      setComment("");
      dispatch({ type: REVIEW_CREATE_RESET });
    }
    dispatch(detailsOfProduct(productId));
  }, [dispatch, successCreatingReview, successRemovingReview, productId]);

  const submitReviewCreateHandler = (e) => {
    e.preventDefault();
    dispatch(
      createReview(productId, {
        rating,
        comment,
      })
    );
  };

  const submitReviewDeleteHandler = (productId, reviewId) => {
    console.log(productId, reviewId);
    dispatch(removeReview(productId, reviewId));
  };

  return (
    <Box style={{ marginTop: "2rem" }}>
      <Grid md={9}>
        <h4 style={{ padding: "1rem 0" }}>
          Комментарии{" "}
          {product.reviews.length === 0
            ? ""
            : "(" + product.reviews.length + ")"}
        </h4>
        {successCreatingReview && (
          <Message variant="success">Благодарим за Ваш отзыв</Message>
        )}
        {errorCreatingReview && (
          <Message variant="error">{errorCreatingReview}</Message>
        )}
        {successRemovingReview && (
          <Message variant="success">Комментарий удален</Message>
        )}
        {errorRemovingReview && (
          <Message variant="error">{errorRemovingReview}</Message>
        )}
        {product.reviews.length === 0 && <Message>Нет комментариев</Message>}
        <List>
          {product.reviews.map((review) => (
            <ListItem
              alignItems="flex-start"
              key={review._id}
              style={{ backgroundColor: "#fafafa", flexDirection: "column" }}
            >
              <strong>
                {review.name}
                {"     "}
              </strong>
              {(userInfo?._id === review.user || userInfo?.isAdmin) && (
                <i
                  className="fas fa-times"
                  onClick={() =>
                    submitReviewDeleteHandler(productId, review._id)
                  }
                  style={{ cursor: "pointer", color: "red" }}
                ></i>
              )}
              <Rating value={review.rating} />
              <small>{DateTimeFilter(review.createdAt)}</small>
              <p style={{ marginTop: "1rem" }}>{review.comment}</p>
            </ListItem>
          ))}
          <ListItem alignItems="flex-start" style={{ flexDirection: "column" }}>
            <h5>Оставить отзыв</h5>
            {userInfo ? (
              <Box display="flex" flexDirection="column">
                <FormControl
                  variant="standard"
                  style={{
                    width: "300px",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <InputLabel id="demo-simple-select-standard-label">
                    Рейтинг
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <MenuItem value="">Выберите оценку...</MenuItem>
                    <MenuItem value="1">Очень плохо</MenuItem>
                    <MenuItem value="2">Плохо</MenuItem>
                    <MenuItem value="3">Удовлетворительно</MenuItem>
                    <MenuItem value="4">Хорошо</MenuItem>
                    <MenuItem value="5">Отлично</MenuItem>
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel>Комментарий</InputLabel>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Комментарий"
                    multiline
                    minRows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </FormControl>
                <Button
                  onSubmit={submitReviewCreateHandler}
                  dark
                  variant="light"
                >
                  Отправить
                </Button>
              </Box>
            ) : (
              <Message>
                Пожалуйста, <Link to="/login">авторизируйтесь</Link> для
                формирования отзыва{" "}
              </Message>
            )}
          </ListItem>
        </List>
      </Grid>
    </Box>
  );
};

export default Reviews;
