import { Features } from "@/constants";
import GradientText from "@/components/general/GradientText";
import { cn } from "@/lib/utils";

const FeatureSection = () => {
    return (
        <section className="bg-white dark:bg-black border-t border-b py-8" id="features">
            <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                <h2 className="text-3xl font-bold tracki text-center sm:text-5xl mb-10">
                    <GradientText text="Features" />
                </h2>
                <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-2 md:gap-12 md:space-y-0">
                    {
                        Features.map((feature) => <div className="flex" key={feature.label}>
                            <div className="flex-shrink-0">
                                <div className={cn("flex items-center justify-center rounded-full p-5 ", feature.bgColor)}>
                                    <feature.icon


                                        className={cn("w-9 h-9", feature.color)}
                                    />
                                </div>
                            </div>

                            <div className="ml-4">
                                <h4 className="text-lg font-medium leadi dark:text-gray-50">{feature.label}</h4>
                                <p className=" dark:text-gray-400">
                                    {feature.desc}
                                </p>
                            </div>
                        </div>
                        )
                    }
                </div>
            </div>
        </section>
    );
};

export default FeatureSection;