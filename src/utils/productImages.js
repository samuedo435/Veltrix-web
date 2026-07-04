import auroraRun from "../assets/aurora-run.png";
import bloomstride from "../assets/bloomstride.jpg";
import miniSprint from "../assets/mini-sprint.jpg";
import novaCourt from "../assets/nova-court.png";
import pinkSpark from "../assets/pink-spark.png";
import pulseFit from "../assets/pulse-fit.png";
import roadstrideCasual from "../assets/roadstride-casual.jpg";
import sprintFlow from "../assets/sprintflow.png";
import starLite from "../assets/star-lite.png";
import terraGripTrail from "../assets/terraGrip-trail.png";
import tinyTrail from "../assets/tiny-trail.png";
import unityStep from "../assets/unity-step.jpg";

const productImages = {
    "aurora run": auroraRun,
    "bloomstride": bloomstride,
    "mini sprint": miniSprint,
    "nova court": novaCourt,
    "pink spark": pinkSpark,
    "pulse fit": pulseFit,
    "roadstride casual": roadstrideCasual,
    "sprintflow": sprintFlow,
    "star lite": starLite,
    "terragrip trail": terraGripTrail,
    "tiny trail": tinyTrail,
    "unity step": unityStep
};

export function getProductImage(productName) {
    if (!productName) return undefined;
    return productImages[productName.trim().toLowerCase()];
}

export default productImages;