import {useStripe} from '@stripe/stripe-react-native';
import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function StripeButton() {
  // Pull out our stripe convenience methods
  const {handleNextActionForSetup, initPaymentSheet, presentPaymentSheet} =
    useStripe();

  // Once we've got a payment method, save it
  const savePaymentMethod = useCallback(
    async (paymentMethodId: string) => {
      // Call our API with the payment method
      const response = await fetch(
        'https://app-api.dev.simmonsbars.tech/v1/account/payment-method',
        {
          method: 'PUT',
          headers: new Headers({
            Authorization: `Bearer 7173a7d5552c65ba9199ecaf12db7f8332b5d6f7`,
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify({
            token: paymentMethodId,
          }),
        },
      );

      const jsonResponse = await response.json();
      // When it needs authentication, it will return the setup intent secret
      // and a 400
      if (response.status === 400 && jsonResponse.error.authorization) {
        // This never returns because the closing of the browser seems to crash
        // the app.
        const confirmResult = await handleNextActionForSetup(
          jsonResponse.error.authorization,
        );
        console.log('Confirm Result: ', confirmResult);
      }

      console.log('Response Body: ', jsonResponse);
    },
    [handleNextActionForSetup],
  );

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={async () => {
        // Initialise a basic payment sheet
        await initPaymentSheet({
          allowsDelayedPaymentMethods: false,
          merchantDisplayName: 'Stripe Woes',
          customFlow: false,
          intentConfiguration: {
            confirmHandler: async (
              paymentMethod,
              _shouldSave,
              _intentCreationCallback,
            ) => {
              savePaymentMethod(paymentMethod.id);
            },
            mode: {
              currencyCode: 'GBP',
              setupFutureUsage: 'OffSession',
            },
          },
          returnURL: 'stripe-example://stripe-redirect',
        });

        // Present it
        await presentPaymentSheet();
      }}>
      <View style={styles.container}>
        <Text>Tap to Pay</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    width: '100%',
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
