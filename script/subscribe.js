<div id="paypal-button-container-P-77368623UD8426358MQWSZFA"></div>
<script src="https://www.paypal.com/sdk/js?client-id=AbC8GNYsvtGL0g05R8CtULT8tLiWtuUUsx5nuZxrg6_7sTv_ZcJaEKrb3ygwmL0atDr1vRKdwhcV9UT-&vault=true&intent=subscription" data-sdk-integration-source="button-factory"></script>
<script>
  paypal.Buttons({
      style: {
          shape: 'pill',
          color: 'gold',
          layout: 'vertical',
          label: 'subscribe'
      },
      createSubscription: function(data, actions) {
        return actions.subscription.create({
          /* Creates the subscription */
          plan_id: 'P-77368623UD8426358MQWSZFA'
        });
      },
      onApprove: function(data, actions) {
        alert(data.subscriptionID); // You can add optional success message for the subscriber here
      }
  }).render('#paypal-button-container-P-77368623UD8426358MQWSZFA'); // Renders the PayPal button
</script>