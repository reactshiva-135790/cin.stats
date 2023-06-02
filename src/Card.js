import { useState, useEffect } from "react";
import axios from "axios";
import "./style/card.css";

const Card = () => {
    const [apiData, setAPIData] = useState([]);
    const [apiData0, setAPIData0] = useState(0);
    const [apiData1, setAPIData1] = useState(0);
    const [apiData2, setAPIData2] = useState(0);
    const [apiData3, setAPIData3] = useState(0);
    const [apiData4, setAPIData4] = useState(0);
    const [apiData5, setAPIData5] = useState(0);
    const [apiData6, setAPIData6] = useState(0);
    const [apiData7, setAPIData7] = useState(0);
    const [apiData8, setAPIData8] = useState(0);
    const [apiData9, setAPIData9] = useState(0);
    const [totalSupply, setTotalSupply] = useState(0);
    const [myDataOnChain, setMyDataOnChain] = useState(0);
    const [totalCirculateSupply, setTotalCirculateSupply] = useState(0);
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`https://reward.cryptoxin.com/getSummary`);
            const apiData = res.data;
            console.log("apiD", apiData);
            setAPIData(apiData);


            const {
                total_burn,
                total_ar_dist,
                total_event,
                total_claim,
                total_stake,
                total_swap,
                totalsubscription,
            } = apiData;

            const totalsupply =
                total_ar_dist.length > 0 && total_event.length > 0 && total_stake.length > 0 && total_claim.length > 0
                    ? total_ar_dist[0].total + total_event[0].total + total_stake[0].total - total_claim[0].total
                    : 0;
            setTotalSupply(totalsupply);

            const totalcirculatesupply =
                total_swap.length > 1 ? total_swap[0].total + total_swap[1].total : 0;
            setTotalCirculateSupply(totalcirculatesupply);

            setAPIData0(total_burn.length > 0 ? total_burn[0].total : 0);
            setAPIData1(total_ar_dist.length > 0 ? total_ar_dist[0].total : 0);
            setAPIData2(total_event.length > 0 ? total_event[0].total : 0);
            setAPIData3(total_claim.length > 0 ? total_claim[0].total : 0);
            setAPIData4(total_stake.length > 0 ? total_stake[0].total : 0);
            setAPIData5(total_swap.length > 0 ? total_swap[0].total : 0);
            setAPIData6(total_swap.length > 1 ? total_swap[1].total : 0);
            setAPIData7(totalsubscription.length > 0 ? totalsubscription[0].total : 0);
            setAPIData8(totalsubscription.length > 1 ? totalsubscription[1].total : 0);
            setAPIData9(totalsubscription.length > 2 ? totalsubscription[2].total : 0);

            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    var removeItems = [
        "0x0000000000000000000000000000000000000000",
        "0x681a8fe24b4f9f9b984d71cfc2abf09b7ff56c58",
        "0x46cc4deeccbf516e4fb6a89c01a7ed40db5cb913",
        "0xbd0632a6c8cba82a00824f2c2e0c8f61865a8e7c",
        "0x86355ebb3547d84c515cd44fad945856221922be",
        "0x4b259744265d648d25042e886766f4eb8bbf3310",
        "0x000000000000000000000000000000000000dead",
        "0x3c22957eac515f75bd0f8035496195f2ca925230",
        "0x47c0832705bf6a43ea21cb6b364218639e0ee8a9",
        "0x341d75846e2f96172e1517bbb827da1e51d09645",
        "0x9f11251ab53bc910f7966b24046aa86844681d9c",
        "0x25183a846b8299826c752f9b1bbafbfb693c4bd1",
        "0xd0c08292bcf08b0a51692ead61437c72181a93f1",
    ];

    const countBreeds = async () => {
        try {
            const breeds = await getBreeds();
            var oldArray = breeds.data.result;
            const newArray = oldArray.filter((value) => {
                return !removeItems.includes(value.address.toString().toLowerCase());
            });
            console.log("NEW ARRAY >>", newArray.length);
            var totalcirculation = 0.0;
            newArray.forEach((element) => {
                var balance = element.balance;
                var nowbalance = balance / 1000000000000000000;
                totalcirculation = nowbalance + totalcirculation;
            });
            console.log("NEW BALANCE", totalcirculation);
            setMyDataOnChain(totalcirculation);
        } catch (error) {
            console.error(error);
        }
    };

    const getBreeds = async () => {
        try {
            return await axios.get(
                "https://cinscan.com/api?module=account&action=listaccounts&page=1&offset=10000"
            );
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        countBreeds();
        getData();
        return () => {
            console.log("clear");
        };
    }, []);

    return (
        <>
            <div className="mhjhfngs">
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-6">
                            <div className="parent card shadow2">
                                {apiData0}
                                <div className="child">Total Burn</div>
                            </div>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-6">
                            <div className="parent card shadow2">
                                {apiData1}
                                <div className="child">Total AR</div>
                            </div>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-6">
                            <div className="parent card shadow2">
                                {apiData2}
                                <div className="child">Total Event</div>
                            </div>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-6">
                            <div className="parent card shadow2">
                                {apiData3}
                                <div className="child">Total Claimed</div>
                            </div>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-6">
                            <div className="parent card shadow2">
                                {apiData4}
                                <div className="child shadow2">Total Locked</div>
                            </div>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-6">
                            <div className="parent card shadow2">
                                <div className="d-flex justify-content-between jkgfkgjl ">
                                    <div>C-W</div>
                                    <div>{apiData5}</div>
                                </div>
                                <div className="d-flex justify-content-between jkgfkgjl mb-5">
                                    <div>W-C</div>
                                    <div>{apiData6}</div>
                                </div>
                                <div className="child">Total Swap</div>
                            </div>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-6">
                            <div className="parent card shadow2">
                                {apiData7}
                                <div className="child">Total Daily Subscription</div>
                            </div>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-6">
                            <div className="parent card shadow2">
                                {apiData8}
                                <div className="child">Total Weekly Subscription</div>
                            </div>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-6">
                            <div className="parent card shadow2">
                                {apiData9}
                                <div className="child">Total Monthly Subscription</div>
                            </div>
                        </div>
                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <div className="parent card shadow2">
                                {/* {myDataOnChain - totalCirculateSupply} */}
                                {totalCirculateSupply}
                                <div className="child">
                                    Total Circulation
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <div className="parent card shadow2">
                                {totalSupply}
                                {/* {myDataOnChain - totalCirculateSupply + totalSupply} */}
                                <div className="child">
                                    Total Supply
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Card;


{/* 
<div className="parent card shadow2">
  {Number(myDataOnChain - totalCirculateSupply + totalSupply).toLocaleString(undefined, { maximumFractionDigits: 20 }).replace(/\.?0+$/, '')}
  <div className="child">
    Total Supply
  </div>
</div>

<div className="parent card shadow2">
  {Number(myDataOnChain - totalCirculateSupply + totalSupply).toLocaleString(undefined, { maximumFractionDigits: 20 }).replace(/\.?0+$/, '')}
  <div className="child">
    Total Supply
  </div>
</div>

*/}

