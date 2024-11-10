// app/electricity/page.tsx
'use client';

import { useState } from 'react';
import styles from './page.module.scss';
import InputField from './../../components/input/InputField';

export default function ElectricityPage() {
  /**
   * Elementos del formulario.
   * 
   * "useState" permite establecer una función (setFormData) para
   * actualizar el valor de una variable (formData).
   * En la inicialización de la función "useState" se establece
   * el valor por defecto.
   */
  const [formData, setFormData] = useState({
    // Precio potencias.
    peakPowerPrice: 0, // Punta.
    valleyPowerPrice: 0, // Valle.
    // Potencias contratadas.
    peakPower: 0, // Punta.
    valleyPower: 0, // Valle.
    // Precio energía.
    peakConsumptionPrice: 0, // Punta.
    valleyConsumptionPrice: 0, // Valle.
    flatConsumptionPrice: 0, // Llano.
    // Energía consumida.
    peakConsumption: 0, // Punta.
    valleyConsumption: 0, // Valle.
    flatConsumption: 0, // Llano.
    // Otros.
    iva: 10, // IVA (En porcentaje).
    billedDays: 30, // Días facturados.
    equipmentRental: 0.026557, // Alquiler de equipos (por día).
    socialBonus: 0.006282, // Bono social (por día).
    taxes: 5.11, // Impuestos (En porcentaje).
  });

  /**
   * Resultado de toda la operación.
   */
  const [result, setResult] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const calculateTotalCost = () => {
    const {
      // Precio potencias.
      peakPowerPrice, // Punta.
      valleyPowerPrice, // Valle.
      // Potencias contratadas.
      peakPower, // Punta.
      valleyPower, // Valle.
      // Precio energía.
      peakConsumptionPrice, // Punta.
      valleyConsumptionPrice, // Valle.
      flatConsumptionPrice, // Llano.
      // Energía consumida.
      peakConsumption, // Punta.
      valleyConsumption, // Valle.
      flatConsumption, // Llano.
      // Otros.
      iva, // IVA (En porcentaje).
      billedDays, // Días facturados.
      equipmentRental, // Alquiler de equipos (por día).
      socialBonus, // Bono social (por día).
      taxes, // Impuestos (En porcentaje).
    } = formData;


    // #region POTENCIAS

    /**
     * Comprobamos si las potencias son inferiores a 1.
     * Esto significa que lo ha expresado en días.
     * Si son superiores lo ha expresado en años.
    */
    let _peakPowerPrice = peakPowerPrice;
    let _valleyPowerPrice = valleyPowerPrice;
    if (valleyPowerPrice > 1) {
      // Estas son los precios de mi factura con los que vamos a hacer una regla de 3.
      const powerPriceYear = 37.488853;
      const powerPriceDay = 0.102709;

      // Obtenemos el precio por día.
      _peakPowerPrice = _peakPowerPrice * powerPriceDay / powerPriceYear;
      _valleyPowerPrice = _valleyPowerPrice * powerPriceDay / powerPriceYear;
    }

    // Calculamos el precio total de la potencia.
    const powerPrice = (billedDays * _peakPowerPrice * peakPower)
      + (billedDays * _valleyPowerPrice * valleyPower);

    // #endregion POTENCIAS

    // #region ENERGÍA

    const consumptionPrice = (peakConsumptionPrice * peakConsumption)
      + (valleyConsumptionPrice * valleyConsumption)
      + (flatConsumptionPrice * flatConsumption);

    // #endregion ENERGÍA

    // #region VARIOS

    // Bono social.
    const socialBonusTotal = billedDays * socialBonus;
    // Alquiler del contador.
    const equipmentRentalTotal = billedDays * equipmentRental;

    // #endregion VARIOS

    // #region IMPUESTOS

    /**
     * Impuesto a la electricidad.
     * (potencia + energía + bonoSocial) * tasas
     */
    const taxElectricity = (powerPrice + consumptionPrice + socialBonusTotal) * (taxes / 100);

    /**
     * IVA
     * 
     * (potencia + energía + bonoSocial + ) * IVA
     */
    const ivaTotal = (powerPrice + consumptionPrice + socialBonusTotal + taxElectricity + equipmentRentalTotal) * (iva / 100);

    // #endregion IMPUESTOS

    const totalCost = powerPrice + consumptionPrice + socialBonusTotal + taxElectricity + equipmentRentalTotal + ivaTotal;

    console.log(powerPrice);
    console.log(consumptionPrice);
    console.log(socialBonusTotal);
    console.log(taxElectricity);
    console.log(equipmentRentalTotal);
    console.log(ivaTotal);
    console.log(totalCost);
    
    setResult(totalCost);
  };

  return (
    <div className={styles.container}>
      <h1>Electricity Dashboard</h1>

      <InputField
        id="peakPowerPrice"
        label="Precio potencia punta"
        value={formData.peakPowerPrice}
        onChange={handleChange}
      />

      <InputField
        id="valleyPowerPrice"
        label="Precio potencia valle"
        value={formData.valleyPowerPrice}
        onChange={handleChange}
      />

      <InputField
        id="peakPower"
        label="Potencia contratada punta"
        value={formData.peakPower}
        onChange={handleChange}
      />

      <InputField
        id="valleyPower"
        label="Potencia contratada valle"
        value={formData.valleyPower}
        onChange={handleChange}
      />

      <InputField
        id="peakConsumptionPrice"
        label="Precio energía punta"
        value={formData.peakConsumptionPrice}
        onChange={handleChange}
      />

      <InputField
        id="valleyConsumptionPrice"
        label="Precio energía valle"
        value={formData.valleyConsumptionPrice}
        onChange={handleChange}
      />

      <InputField
        id="flatConsumptionPrice"
        label="Precio energía llano"
        value={formData.flatConsumptionPrice}
        onChange={handleChange}
      />

      <InputField
        id="peakConsumption"
        label="Energía consumida punta"
        value={formData.peakConsumption}
        onChange={handleChange}
      />

      <InputField
        id="valleyConsumption"
        label="Energía consumida valle"
        value={formData.valleyConsumption}
        onChange={handleChange}
      />

      <InputField
        id="flatConsumption"
        label="Energía consumida llano"
        value={formData.flatConsumption}
        onChange={handleChange}
      />

      <InputField
        id="billedDays"
        label="Días facturados"
        value={formData.billedDays}
        onChange={handleChange}
      />

      <InputField
        id="equipmentRental"
        label="Alquiler de equipos"
        value={formData.equipmentRental}
        onChange={handleChange}
      />

      <InputField
        id="socialBonus"
        label="Bono social"
        value={formData.socialBonus}
        onChange={handleChange}
      />

      <InputField
        id="taxes"
        label="Tasas"
        value={formData.taxes}
        onChange={handleChange}
      />

      <InputField
        id="iva"
        label="IVA"
        value={formData.iva}
        onChange={handleChange}
      />

      <button onClick={calculateTotalCost}>Calcular gasto total</button>

      {result !== null && (
        <div className={styles.result}>
          <h2>Total Cost: {result.toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
}