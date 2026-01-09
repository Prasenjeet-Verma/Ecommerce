exports.paymentSuccess = async (req, res) => {
  try {
    const temp = req.session.tempOrder;

    if (!temp) {
      return res.redirect("/");
    }

    // 🔐 Stock minus (safe)
    const result = await Product.updateOne(
      { _id: temp.product, totalStock: { $gte: temp.qty } },
      { $inc: { totalStock: -temp.qty } }
    );

    if (result.modifiedCount === 0) {
      return res.send("Out of stock");
    }

    // 🧾 Create order after payment
    const order = await Order.create({
      ...temp,
      paymentMethod: "ONLINE",
      paymentStatus: "Paid",
      orderStatus: "Confirmed",
    });

    delete req.session.tempOrder;

    res.redirect("/order-success/" + order._id);

  } catch (err) {
    console.error(err);
    res.send("Payment success error");
  }
};
