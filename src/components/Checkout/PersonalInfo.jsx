import { useState } from 'react';
import useCheckout from './useCheckout.jsx';
import Spinner from '../Spinner/Spinner.jsx';

const PersonalInfo = ({ handleStep, setOrder }) => {
  const [loading, setLoading] = useState(false);
  const { form, errors, handleChange, handleSubmit, handleBlur } =
    useCheckout();

  const onSubmit = async (e) => {
    try {
      setLoading(true);
      const newOrder = await handleSubmit(e);
      setOrder(newOrder);
      handleStep(3);
      setLoading(false);
    } catch (error) {
      console.log('error');
      setLoading(false);
    }
  };

  return (
    <>
      <form
        id="order-form"
        onSubmit={onSubmit}
        className="max-w-[500px] mx-auto flex flex-col mb-8 "
        noValidate
      >
        {loading && <Spinner />}
        <div className="field">
          <div className="error__field">
            <span className={`span__error ${!errors.name ? 'error__msg' : ''}`}>
              {errors.name}
            </span>
          </div>
          <input
            className={`input__field border py-1 px-2 w-full rounded ${
              errors.name ? 'has__error' : ''
            }`}
            type="text"
            name="name"
            id="name"
            value={form.name}
            placeholder=" "
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label htmlFor="name">Nombre y Apellido</label>
        </div>

        <div className="field">
          <div className="error__field">
            <span className={`span__error ${!errors.dni ? 'error__msg' : ''}`}>
              {errors.dni}
            </span>
          </div>
          <input
            className={`input__field border py-1 px-2 w-full rounded ${
              errors.dni ? 'has__error' : ''
            }`}
            type="text"
            name="dni"
            id="dni"
            value={form.dni}
            placeholder=" "
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label htmlFor="name">DNI</label>
        </div>

        <div className="field">
          <div className="error__field">
            <span
              className={`span__error ${!errors.email ? 'error__msg' : ''}`}
            >
              {errors.email}
            </span>
          </div>
          <input
            className={`input__field border py-1 px-2 w-full rounded ${
              errors.email ? 'has__error' : ''
            }`}
            type="email"
            name="email"
            id="email"
            value={form.email}
            placeholder=" "
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label htmlFor="name">Email</label>
        </div>
        <div className="field">
          <div className="error__field">
            <span
              className={`span__error ${!errors.phone ? 'error__msg' : ''}`}
            >
              {errors.phone}
            </span>
          </div>
          <input
            className={`input__field border py-1 px-2 w-full rounded ${
              errors.phone ? 'has__error' : ''
            }`}
            type="text"
            name="phone"
            id="phone"
            value={form.phone}
            placeholder=" "
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label htmlFor="name">Teléfono</label>
        </div>
        <div className="mt-4 text-[#334155]">
          <input
            type="checkbox"
            id="delivery"
            name="delivery"
            checked={form.delivery}
            onChange={handleChange}
          />
          <label
            htmlFor="delivery"
            className="pl-2"
          >
            Quiero que me envíen el pedido
          </label>
        </div>

        {form.delivery && (
          <>
            <div className="field">
              <div className="error__field">
                <span
                  className={`span__error ${!errors.state ? 'error__msg' : ''}`}
                >
                  {errors.state}
                </span>
              </div>
              <input
                className={`input__field border py-1 px-2 w-full rounded ${
                  errors.state ? 'has__error' : ''
                }`}
                type="text"
                name="state"
                id="state"
                value={form.state}
                placeholder=" "
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="name">Provincia</label>
            </div>

            <div className="field">
              <div className="error__field">
                <span
                  className={`span__error ${!errors.city ? 'error__msg' : ''}`}
                >
                  {errors.city}
                </span>
              </div>
              <input
                className={`input__field border py-1 px-2 w-full rounded ${
                  errors.city ? 'has__error' : ''
                }`}
                type="text"
                name="city"
                id="city"
                value={form.city}
                placeholder=" "
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="name">Ciudad</label>
            </div>

            <div className="field">
              <div className="error__field">
                <span
                  className={`span__error ${
                    !errors.address ? 'error__msg' : ''
                  }`}
                >
                  {errors.address}
                </span>
              </div>
              <input
                className={`input__field border py-1 px-2 w-full rounded ${
                  errors.address ? 'has__error' : ''
                }`}
                type="text"
                name="address"
                id="address"
                value={form.address}
                placeholder=" "
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="name">Domicilio</label>
            </div>
          </>
        )}
        <div className="field">
          <div className="error__field">
            <span
              className={`span__error ${!errors.comment ? 'error__msg' : ''}`}
            >
              {errors.comment}
            </span>
          </div>

          <textarea
            className="input__field border py-1 px-2 w-full rounded"
            name="observation"
            rows={4}
            id="observation"
            placeholder=" "
            value={form.comment}
            onChange={handleChange}
            onBlur={handleBlur}
          ></textarea>
          <label htmlFor="observation">Comentario</label>
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => handleStep(1)}
            className="py-2 px-4 border rounded"
          >
            Cancelar
          </button>
          <button className="py-2 px-4 border rounded bg-[#f98b24]">
            Enviar Pedido
          </button>
        </div>
      </form>
    </>
  );
};
export default PersonalInfo;
