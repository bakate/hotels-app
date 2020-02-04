import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  CardElement,
  injectStripe,
  StripeProvider,
  Elements,
} from 'react-stripe-elements';
import { UserContext } from '../context/user';
import { CartContext } from '../context/cart';
import submitOrder from '../strapi/submitOrder';
import EmptyCart from '../components/Cart/EmptyCart';

function Checkout(props) {
  const { user, alert, hideAlert, showAlert } = useContext(UserContext);
  const { cart, total, clearCart } = useContext(CartContext);
  const history = useHistory();
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const isEmpty = !name || alert.show;

  async function handleSubmit(e) {
    showAlert({ msg: 'Nous traitons ta commande. Un peu de patience...' });
    e.preventDefault();
    const response = await props.stripe
      .createToken()
      .catch(e => console.log(e));
    const { token } = response;
    if (token) {
      setError('');
      const { id } = token;
      const order = await submitOrder({
        name,
        total,
        items: cart,
        stripeTokenId: id,
        userToken: user.token,
      });
      if (order) {
        showAlert({
          msg: 'Ta commande a bien été validée. Merci de ta confiance',
        });
        clearCart();
        history.push('/');
        return;
      }
      showAlert({
        msg:
          "Mince. Tout ne s'est pas parfaitement déroulé. On retente à nouveau ?",
        type: 'danger',
      });
    } else {
      hideAlert();
      setError(response.error.message);
    }
    if (!cart.length) {
      return <EmptyCart />;
    }
  }
  return (
    <section className="section form">
      <h2 className="section-title">Commander</h2>
      <h3>
        Montant total de ta commande: <span>{total}€</span>
      </h3>
      <form className="checkout-form">
        {/* single input */}
        <div className="form-control">
          <label htmlFor="name">nom</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        {/* end of single input */}
        {/* card element */}
        <div className="stripe-input">
          <label htmlFor="card-element">Carte de Crédit ou Débit</label>
          <p className="stripe-info">
            teste en utlisant ce numéro de carte:{' '}
            <span>4242 4242 4242 4242</span>
            <br />
            entre un code postal à 5 chiffres:
            <br />
            saisis 3 chiffres pour le cryptogramme visuel:
          </p>
        </div>
        {/* stripe elements */}
        <CardElement />
        {/* stripe error */}
        {error && <p className="form-empty">{error}</p>}
        {/* empty value */}
        {isEmpty ? (
          <p className="form-empty">Un petit effort encore...</p>
        ) : (
          <button
            type="submit"
            className="btn btn-primary btn-block"
            onClick={handleSubmit}
          >
            Payer
          </button>
        )}

        {/* end of stripe elements */}
      </form>
    </section>
  );
}

const CardFormWithStripe = injectStripe(Checkout);
function StripeWrapper() {
  return (
    <StripeProvider apiKey="pk_test_QUU0kiq6iJcb7n6PMAO8Z64Y">
      <Elements>
        <CardFormWithStripe />
      </Elements>
    </StripeProvider>
  );
}

export default StripeWrapper;
