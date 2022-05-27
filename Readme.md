# Global
- Sell orders / close position

# Frontend
- Find a font - get font working
- Get RN vector icons working
- Add a line that dictates ITM, OTM on strike price slider
<!-- - Clean up manager display (if open position, show buy more and sell - otherwise two buys) -->
<!-- - Fix pressing position and options to set focus on symbol & strike -->

# Backend
<!-- - Replace all strike, symbol mentions with option symbol and utilize parsing function -->
<!-- - Add strike data to indices -->
<!-- - Add default loading boxes for indexes -->
<!-- - Inspect rate limiting violation tradier -->
- Add to position (even with stop loss)
- Current option price on position
- Position management modal
  - Long press on position or order opens
  - Has: 
    - Everything on position
    - Position P&L
    - Button to add limit stop
      - Support stop losses when underlying hits certain price
      - Shows slider for underlying price

# Testing
- Test clicking an open order and see if it is properly setting the slider strike price