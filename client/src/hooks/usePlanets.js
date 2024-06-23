import { useCallback, useEffect, useState } from "react";

import { httpGetPlanets } from "./requests";

function usePlanets() {
  const [planets, savePlanets] = useState([1]);

  const getPlanets = useCallback(async () => {
    const fetchedPlanets = await httpGetPlanets();
    console.log("fetchplanets is : ", fetchedPlanets);
    savePlanets(fetchedPlanets);
  }, []);

  useEffect(() => {
    getPlanets();
  }, [getPlanets]);

  return planets;
}

export default usePlanets;
