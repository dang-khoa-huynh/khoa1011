import { useState, useEffect } from "react";
import { Headphones, MessageCircle, X } from "lucide-react";
import "./FloatingContact.css";

// Link Messenger Fanpage & Zalo của shop
const MESSENGER_URL = "https://m.me/61596176506026";
const ZALO_URL = "https://zalo.me/0827396638";

export default function FloatingContact() {
    const [isOpen, setIsOpen] = useState(false);

    // Ẩn bong bóng mặc định của Tawk.to để gom chung vào nút menu này
    useEffect(() => {
        window.Tawk_API = window.Tawk_API || {};
        // Nếu Tawk.to đã load xong từ trước thì ẩn luôn
        window.Tawk_API.hideWidget?.();
        // Nếu Tawk.to chưa load xong thì ẩn ngay khi load xong
        window.Tawk_API.onLoad = () => {
            window.Tawk_API.hideWidget?.();
        };
        window.Tawk_API.onChatMinimized = () => {
            window.Tawk_API.hideWidget?.();
        };
    }, []);

    // Mở khung Live Chat Tawk.to khi bấm nút Live Chat
    const openLiveChat = () => {
        setIsOpen(false);
        window.Tawk_API?.showWidget?.();
        window.Tawk_API?.maximize?.();
    };

    return (
        <div className={`floating-radial ${isOpen ? "is-open" : ""}`}>
            {/* Nút 1 (trên): Mở Live Chat Tawk.to */}
            <button
                type="button"
                onClick={openLiveChat}
                className="radial-item item-livechat"
                aria-label="Live Chat hỗ trợ"
                title="Live Chat hỗ trợ"
            >
                <Headphones size={20} />
            </button>

            {/* Nút 2 (chéo 45°): Chat Zalo */}
            <a
                href={ZALO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="radial-item item-zalo"
                aria-label="Chat Zalo"
                title="Chat qua Zalo"
            >
                <span className="zalo-text">Zalo</span>
            </a>

            {/* Nút 3 (trái): Chat Facebook Messenger */}
            <a
                href={MESSENGER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="radial-item item-messenger"
                aria-label="Chat Facebook Messenger"
                title="Chat Facebook Messenger"
            >
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.912 1.454 5.512 3.727 7.213V22l3.405-1.869c.91.252 1.874.387 2.868.387 5.523 0 10-4.145 10-9.243C22 6.145 17.523 2 12 2zm1.06 12.444l-2.548-2.717-4.97 2.717 5.468-5.804 2.61 2.717 4.908-2.717-5.468 5.804z" />
                </svg>
            </a>

            {/* Nút chính ở tâm */}
            <button
                type="button"
                className="radial-main"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Liên hệ nhanh"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </button>
        </div>
    );
}
