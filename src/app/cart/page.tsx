import Pageheader from "@/components/common/PageHeaderBanner/Pageheader";
import CartPageContainer from "./_components/CartPageContainer";

const CartPage = () => {
    const breadcrumbLinks = {
        mode: "dark" as string,
        preLinks: [{ link: "/", name: "Home" }],
        pageName: "Cart",
    };
    return (
        <div>
            <Pageheader
                img="https://utfs.io/f/oI7Ou0bdQ6rjyuWH9qZmawxvB8dF9SHPlQoWAbCuyU4hqriR"
                title="YOUR CART"
                breadLink={breadcrumbLinks}
            />
            <CartPageContainer />
        </div>
    );
};

export default CartPage;
