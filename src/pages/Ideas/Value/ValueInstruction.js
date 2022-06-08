import { Link, NavLink } from "react-router-dom";
import IntroBox from "../../../components/IntroBox/IntroBox";
import TopBackNext from "../../../components/TopBar/TopBackNext";

function ValueInstruction() {
  return (
    <>
      {" "}
      <TopBackNext to="helpful-hints" text="Instructions" />
      <IntroBox text="Each prospective airdrop address must submit an on-line application that includes a favorite current investment recommendation. To assist you in this process, we have provided the guidelines below." />
      <br />
      <br />
      <h4>
        <mark>INVESTMENT IDEA</mark>
      </h4>
      <br />
      <p>
        Should be about an explanation of your investment idea in consistent
        detail with the highest rated ideas on the site, which you can review
        under the "Ideas" tab above. The idea must be crypto/blockchain related
        and either long or short. The value investor is trying to find
        undervalued asset with expecting situations that could affect coin price
        (it can be politics, release of a new technology, competitive advantage,
        sales increase announcement, etc).
      </p>
      <br />
      <p>
        Your idea should include the appropriate valuation criteria for the
        selected coin that may involve some of the following measures:
      </p>
      <br />
      <br />
      <table>
        <th></th>
        <tr>
          <td>Market Cap & TVL</td>
          <td>Generated Protocol Earnings</td>
          <td>NVT ratio</td>
        </tr>
        <tr>
          <td> Velocity (Speed)</td>
          <td>Sharpe Ratio</td>
          <td>Volatility</td>
        </tr>
      </table>
      <br />
      <br />
      <p>
        {" "}
        The valuation of a crypto-asset fundamentally depends on its nature. In
        addition, if any of the following valuation criteria apply to your idea,
        please include analysis:
        <br />
        <br />
        {">"} Future growth sales/earnings rates through income or market
        approach
        <br />
        {">"} Relative value to similar coins
        <br />
        {">"} Tokenomics (supply, distribution, inflation, vesting...)
        <br />
        {">"} Break-up analysis <br />
        {">"} Asset valuation <br />
        {">"} Underlying team or founders. <br />
        <br />
        <br />
        Heavy insider ownership, recent open market transactions, special option
        grants or other evidence of extraordinary management incentives should
        be noted.
        <br />
        <br />
        <b>
          Please focus on any special insights that you may have into the coin
          or the particular situation.
        </b>
        &nbsp;Detailed operating descriptions can easily be found so space
        should not be wasted with readily available information that is not
        central to the basic investment thesis.
      </p>
      <br /> <br />
      <h4>
        <mark>CATALYST</mark>
      </h4>
      <br />
      <p>
        Should explain what action, event, situation or future realization will
        cause the market to recognize the value discrepancy that you observe.
        Examples could include an impending regulatory/legal change, expected
        sale/merger, spin-off, split-off, restructuring, large buyback, product
        introduction, management change, or other. Sometimes no catalyst is
        identifiable, but value discrepancy is too large to ignore.
      </p>{" "}
      <br />
      <br />
      <Link to="helpful-hints">
        <h3 className="buttonStarYoutown">&gt; Start your own</h3>
      </Link>
      <br /> <br /> <br />
      <div className="definitions">
        <div className="topdef">
          <h4>Definitions</h4> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <NavLink to="/learn">
            <p id="moredef">&gt; CLICK FOR MORE</p>
          </NavLink>
        </div>
        <br />
        <b>
          <u>
            <h4>Network Value to Transactions Ratio (NVT Ratio) </h4>
          </u>
        </b>
        <p>
          NVT ratio is PE(Price Earning) ratio in cryptocurrency evaluating its
          value by transaction volume If the value is too high, it means the
          network is overvalued compared to the low ability to transact coins in
          terms of volume, implying the possible removal of the price bubble
          coming. This interpretation is based on the effect of mean reversion.
        </p>
        <br />
        <b>
          <u>
            <h4>Total Value Locked (TVL) </h4>
          </u>
        </b>
        <p>
          TVL stands for total value locked. It defines the spot value (usually
          denominated in USD) of all assets that are staked in a protocol. It’s
          generally used as an indicator of how healthy a protocol is. Assets
          staked in a protocol can be:
        </p>
        <br />
        <b>
          <u>
            <h4>Fully diluted Market Cap</h4>
          </u>
        </b>
        <p>
          A fully diluted market cap on the other hand, measures the market cap
          when all of the coins are issued. It is the sum of the maximum supply
          of the coin multiplied by the current price of the coin.
        </p>
        <br />
        <b>
          <u>
            <h4>Sharpe Ratio</h4>
          </u>
        </b>
        <p>
          Sharpe Ratio is the average return earned in excess of the risk-free
          rate per unit of volatility. While calculating the ratio, we subtract
          the risk-free rate from the mean return. This allows us to calculate
          profits associated with the risk-taking activity.
        </p>
      </div>
    </>
  );
}
export default ValueInstruction;
