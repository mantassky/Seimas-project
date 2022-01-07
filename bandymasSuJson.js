

window.onload = () => {
    var e = document.getElementById("linija");
    var nariai = "";
    e.onclick = () => {
        e.innerText = "";
        var count = 0;
        $.getJSON("https://raw.githubusercontent.com/mantassky/Seimas-project/main/seimoNariai.json", function (data) {

            function compareIskelta(a, b) {
                if (a.iškėlusi_partija < b.iškėlusi_partija) {
                    return -1;
                }
                else if (a.iškėlusi_partija > b.iškėlusi_partija) {
                    return 1;
                } else {
                    return 0;
                }
            }
            function compareIskelta(a, b) {
                if (a.iškėlusi_partija < b.iškėlusi_partija) {
                    return -1;
                }
                else if (a.iškėlusi_partija > b.iškėlusi_partija) {
                    return 1;
                } else {
                    return 0;
                }
            }

            data.SeimoKadencija.SeimoNarys.sort(compareIskelta);

            const frakcijuID=["1322","1154","870", "1022",  "1070","874","793","1318","-1"];
            const frakcijos= ["D",   "LP",  "LRLS","TS-LKD","LVZS","DP", "LSP","R","SP"];
            //const frakcijuSpalvos;
            data.SeimoKadencija.SeimoNarys.forEach(narys => {
                if (narys.data_iki === "") {
                    count++;
                    // narys.SeimoNarys.Pareigos.forEach(pareiga => {

                    //     if(pareiga.pareigos.substring(0,9)==="Frakcijos"&&pareiga.data_iki==="") {
                    //         narys.dabartine_frakcija=pareiga.padalinio_pavadinimas;
                    //     }
                    // })
                    
                    var padalinioID=narys.Pareigos.find(pareiga =>  frakcijuID.includes(pareiga.padalinio_id)&&pareiga.data_iki==="");

                    narys.dabartine_frakcija=frakcijos[frakcijuID.indexOf(padalinioID.padalinio_id)];

                    console.log(padalinioID.padalinio_id+" "+count);

                    //console.log(frakcija.padalinio_pavadinimas+" "+narys.vardas);


                    switch (narys.iškėlusi_partija) {
                        case "Laisvės partija":
                            narys.partijos_spalva = "pink";
                            break;
                        case "Lietuvos valstiečių ir žaliųjų sąjunga":
                            narys.partijos_spalva = "green";
                            break;
                        case "Tėvynės sąjunga – Lietuvos krikščionys demokratai":
                            narys.partijos_spalva = "TS-LKD ----";
                            break;
                        case "Lietuvos socialdemokratų partija":
                            narys.partijos_spalva = "LSP -------";
                            break;
                        case "Lietuvos Respublikos liberalų sąjūdis":
                            narys.partijos_spalva = "LRLS ------";
                            break;
                        case "Darbo partija":
                            narys.partijos_spalva = "DP --------";
                            break;
                        default:
                            narys.partijos_spalva = "black -----";
                    }

                    nariai = nariai + narys.dabartine_frakcija + " ";


                    nariai = nariai + narys.vardas + " " + narys.pavardė + "\n";
                }
            })
            nariai = nariai + count + " Seimo nariai";
            e.innerText = nariai;


        }).fail(function () {
            console.log("An error has occurred.");
        });

        // $.get("https://raw.githubusercontent.com/mantassky/Seimas-project/main/seimoNariai.xml", function (data) {
        //     var nariaiXML=$.parseXML(data);
        //     e.innerText=xml2json(nariaiXML," ");

        //     //e.innerText=data;

        // }).fail(function () {
        //     console.log("An error has occurred.");
        // });

    }
}