import SectionHeader from "@/components/common/sectionHeader/sectionHeader";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export default function testimonial() {
    const testimonials = [
        {
            quote: "Our pizza experience was exceptional! The crust was thin and crispy, just how we like it, and the array of fresh, high-quality toppings was impressive. The online ordering process was effortless, and the delivery was prompt, ensuring our pizza arrived piping hot. A true gourmet delight – we'll be ordering again soon!",
            name: "Sarah Chen",
            designation: "Product Manager at TechFlow",
            src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            quote: "Our pizza experience was exceptional! The crust was thin and crispy, just how we like it, and the array of fresh, high-quality toppings was impressive. The online ordering process was effortless, and the delivery was prompt, ensuring our pizza arrived piping hot. A true gourmet delight – we'll be ordering again soon!",
            name: "Michael Rodriguez",
            designation: "CTO at InnovateSphere",
            src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            quote: "Our pizza experience was exceptional! The crust was thin and crispy, just how we like it, and the array of fresh, high-quality toppings was impressive. The online ordering process was effortless, and the delivery was prompt, ensuring our pizza arrived piping hot. A true gourmet delight – we'll be ordering again soon!",
            name: "Emily Watson",
            designation: "Operations Director at CloudScale",
            src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            quote: "Our pizza experience was exceptional! The crust was thin and crispy, just how we like it, and the array of fresh, high-quality toppings was impressive. The online ordering process was effortless, and the delivery was prompt, ensuring our pizza arrived piping hot. A true gourmet delight – we'll be ordering again soon!",
            name: "James Kim",
            designation: "Engineering Lead at DataPro",
            src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            quote: "Our pizza experience was exceptional! The crust was thin and crispy, just how we like it, and the array of fresh, high-quality toppings was impressive. The online ordering process was effortless, and the delivery was prompt, ensuring our pizza arrived piping hot. A true gourmet delight – we'll be ordering again soon!",
            name: "Lisa Thompson",
            designation: "VP of Technology at FutureNet",
            src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
    ];
    return (
        <div className="pt-16 h-screen bg-[#121619] ">
            <div>
                <div className="bg-primary-black w-full relative overflow-hidden">
                    <div className="w-full absolute h-[32px] md:h-[66px] lg:h-[136px] -top-4 md:-top-8 lg:-top-16"></div>
                    <div className="container py-[50px] lg:py-[100px]">
                        <SectionHeader
                            title="What Our Clients Say"
                            heading="CUSTOMER REVIEWS"
                            headingTextColor="text-white"
                        />
                    </div>

                    <AnimatedTestimonials testimonials={testimonials} />
                </div>
            </div>
        </div>
    );
}
