import { SocialIcon } from "react-social-icons";
import "./Network.css";

function Network() {
  return (
    <div>
      <ul id="socialnetwork">
        <li>
          <SocialIcon
            className="iconsocial"
            bgColor="var(--secondary-color)"
            style={{ height: 20, width: 20 }}
            target="_blank"
            url="https://twitter.com/BlockSwanHQ"
          />
        </li>
        <li>
          <SocialIcon
            className="iconsocial"
            bgColor="var(--secondary-color)"
            style={{ height: 20, width: 20 }}
            target="_blank"
            url="https://www.instagram.com/blockswanhq/?hl=en"
          />
        </li>
        <li>
          <SocialIcon
            bgColor="var(--secondary-color)"
            className="iconsocial"
            style={{ height: 20, width: 20 }}
            target="_blank"
            url="https://t.me/blockswanfinance"
          />
        </li>
        <li>
          <SocialIcon
            bgColor="var(--secondary-color)"
            className="iconsocial"
            style={{ height: 20, width: 20 }}
            target="_blank"
            url="https://discord.gg/ffrzhYEn57"
          />
        </li>
        <li>
          <SocialIcon
            bgColor="var(--secondary-color)"
            className="iconsocial"
            style={{ height: 20, width: 20 }}
            target="_blank"
            url="https://www.facebook.com/blockswanhq"
          />
        </li>
        <li>
          <SocialIcon
            bgColor="var(--secondary-color)"
            className="iconsocial"
            style={{ height: 20, width: 20 }}
            target="_blank"
            url="https://www.linkedin.com/company/blockswan-dao/"
          />
        </li>
        <li>
          <SocialIcon
            bgColor="var(--secondary-color)"
            className="iconsocial"
            style={{ height: 20, width: 20 }}
            target="_blank"
            url="https://github.com/BlockSwan"
          />
        </li>
        <li>
          <SocialIcon
            bgColor="var(--secondary-color)"
            className="iconsocial"
            style={{ height: 20, width: 20 }}
            target="_blank"
            url="https://www.youtube.com/channel/UC-_qOrfAHp0VHMdtJ1dp_TA"
          />
        </li>
      </ul>
    </div>
  );
}
export default Network;
