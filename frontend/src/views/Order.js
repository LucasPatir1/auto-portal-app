import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Message from "../ui/components/Message";
import Loader from "../ui/components/Loader";
import {
  ORDER_UPDATE_STATUS_FOR_PAYING_RESET,
  ORDER_DELIVER_RESET,
} from "../redux/constants/order.constants";
import { CART_RESET_PRODUCTS } from "../redux/constants/cart.constants";
import { getOrderDetails } from "../redux/actions/order.actions";
import OrderProductTable from "../components/OrderProductTable";
import OrderProductActionsStatus from "../components/OrderProductActionsStatus";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Typography } from "@mui/material";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";

const Order = (props) => {
  const dispatch = useDispatch();

  const orderId = props.match.params.id;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPayingStatus = useSelector((state) => state.orderPayingStatus);
  const { loading: loadingPayingProcess, success: successPayingProcess } =
    orderPayingStatus;

  const orderDeliveringStatus = useSelector(
    (state) => state.orderDeliveringStatus
  );
  const {
    loading: loadingDeliveringProcess,
    success: successDeliveringProcess,
  } = orderDeliveringStatus;

  useEffect(() => {
    if (!order || successPayingProcess || successDeliveringProcess) {
      dispatch({ type: ORDER_UPDATE_STATUS_FOR_PAYING_RESET });
      dispatch({ type: CART_RESET_PRODUCTS });
      dispatch({ type: ORDER_DELIVER_RESET });
    }
    dispatch(getOrderDetails(orderId));
  }, [orderId]);

  const generateOrderPdfHandler = () => {
    const printOrder = document.getElementById("printOrder");
    const pdf = new jsPDF("p", "mm", "a4"),
      pdfInternals = pdf.internal,
      pdfPageSize = pdfInternals.pageSize,
      pdfPageWidth = pdfPageSize.width * 0.8;
    pdf.setFontSize(8);

    html2canvas(printOrder).then((canvas) => {
      const image = canvas.toDataURL("image/png");
      pdf.addImage(image, "PNG", 20, 30, pdfPageWidth, 0);
      pdf.save(`${order.user.name}_${order._id}`);
    });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : (
        <>
          <Box id="printOrder">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                color: "grey",
                marginTop: "20px",
              }}
            >
              <DevicesOtherIcon sx={{ fontSize: "2rem" }}></DevicesOtherIcon>
              <Typography>IGadgetShop</Typography>
              <Typography variant="h6" style={{ color: "grey" }}>
                Заказ № {order._id}
              </Typography>
            </Box>
            <Grid>
              <Box>
                <Grid container display="inline-flex" justifyContent="center">
                  <OrderProductTable order={order} />
                  <Grid item xs={6} sm={6} md={3} lg={3}>
                    <Paper>
                      <List>
                        <ListItem>
                          <Typography variant="h6" style={{ color: "grey" }}>
                            Расчетная сумма
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <Grid>
                            <Box>Товары</Box>
                            <Box>${order.productsPrice}</Box>
                          </Grid>
                        </ListItem>
                        <ListItem>
                          <Grid>
                            <Box>Доставка</Box>
                            <Box>${order.shippingPrice}</Box>
                          </Grid>
                        </ListItem>
                        <ListItem>
                          <Grid>
                            <Box>Налог</Box>
                            <Box>${order.taxPrice}</Box>
                          </Grid>
                        </ListItem>
                        <ListItem>
                          <Grid>
                            <Box>
                              <strong>Итого</strong>
                            </Box>
                            <Box>
                              <strong>${order.totalPrice}</strong>
                            </Box>
                          </Grid>
                        </ListItem>
                      </List>
                    </Paper>
                    <OrderProductActionsStatus
                      orderId={orderId}
                      order={order}
                      loadingPayingProcess={loadingPayingProcess}
                      loadingDeliveringProcess={loadingDeliveringProcess}
                      successPayingProcess={successPayingProcess}
                      successDeliveringProcess={successDeliveringProcess}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}
          >
            <Button
              variant="outlined"
              color="inherit"
              onClick={generateOrderPdfHandler}
            >
              Распечатать чек
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default Order;
