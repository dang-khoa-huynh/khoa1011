import { useEffect } from "react";
import { MessageCircle } from "lucide-react";
import "./FloatingContact.css";

// Link Messenger Fanpage của shop
const MESSENGER_URL = "https://m.me/61596176506026";

export default function FloatingContact() {
    // Ẩn bong bóng mặc định của Tawk.to để dùng nút Live Chat thẳng hàng ngay dưới Messenger
    useEffect(() => {
        window.Tawk_API = window.Tawk_API || {};
        window.Tawk_API.hideWidget?.();
        window.Tawk_API.onLoad = () => {
            window.Tawk_API.hideWidget?.();
        };
        window.Tawk_API.onChatMinimized = () => {
            window.Tawk_API.hideWidget?.();
        };
    }, []);

    // Mở khung Live Chat Tawk.to khi bấm nút Live Chat
    const openLiveChat = () => {
        window.Tawk_API?.showWidget?.();
        window.Tawk_API?.maximize?.();
    };

    return (
        <div className="floating-contact">
            {/* Nút trên: Facebook Messenger */}
            <a
                href={MESSENGER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="floating-btn is-messenger"
                aria-label="Chat Facebook Messenger"
                title="Chat Facebook Messenger"
            >
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.912 1.454 5.512 3.727 7.213V22l3.405-1.869c.91.252 1.874.387 2.868.387 5.523 0 10-4.145 10-9.243C22 6.145 17.523 2 12 2zm1.06 12.444l-2.548-2.717-4.97 2.717 5.468-5.804 2.61 2.717 4.908-2.717-5.468 5.804z" />
                </svg>
            </a>

            {/* Nút dưới: Live Chat Tawk.to */}
            <button
                type="button"
                onClick={openLiveChat}
                className="floating-btn is-livechat"
                aria-label="Live Chat hỗ trợ"
                title="Live Chat hỗ trợ"
            >
                <MessageCircle size={24} />
            </button>
        </div>
    );
}
