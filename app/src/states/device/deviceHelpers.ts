const calculateHypotenuse = (oppositeEdgeLength: number, angleInDegree: number) => {
  const radians = angleInDegree * (Math.PI / 180); // convert degrees to radians
  const hypotenuse = oppositeEdgeLength / Math.sin(radians);
  return hypotenuse;
};

const calculateScreenHypotenuse = () => calculateHypotenuse(window.innerWidth, 30);

export const deviceHelpers = {
  calculateScreenHypotenuse,
};


/**
 * Longueur d'un rectangle en fonction de sa diagonale et de sa largeur
 *
 * a2 + b2 = c2
 *
 * a = sqrt(c2 - b2)
 *
 *
 * Longueur d'une diagonal de 30° qui traverse l'ecran
 *
 * cos(A) = adjacent / hypothenuse
 * cos(30°) = windows.innerHeight / hypothenuse
 * hypothenuse = windows.innerHeight / cos(30°)
 *
 * Longueur du coté opposé d'un triangle
 *
 * tan(A) = opposite / adjacent
 * opposite = tan(A) * adjacent
 *
 *
 */
