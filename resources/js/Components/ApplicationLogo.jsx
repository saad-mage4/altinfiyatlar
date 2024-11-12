import { useApiQuery } from "@/hooks/useApi";
import Image from "./UI/Image";

export default function ApplicationLogo(props) {
    const { data: images } = useApiQuery("images", "/get-images");

    return (
        <Image
            {...props}
            value={`../${images?.logo_header}`}
            alt="footer-logo"
            defaultSrc="https://dummyimage.com/192x44/fff/000"
        />
    );
}
