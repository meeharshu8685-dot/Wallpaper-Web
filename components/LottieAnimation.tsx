
import React from 'react';
import Lottie from 'lottie-react';

interface LottieAnimationProps {
    url: string;
    className?: string;
    loop?: boolean;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({ url, className, loop = true }) => {
    const [animationData, setAnimationData] = React.useState<any>(null);

    React.useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => setAnimationData(data))
            .catch((err) => console.error("Lottie loading error:", err));
    }, [url]);

    if (!animationData) return <div className={className} />;

    return (
        <div className={className}>
            <Lottie animationData={animationData} loop={loop} />
        </div>
    );
};

export default LottieAnimation;
