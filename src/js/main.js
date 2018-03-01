import {CanvasItem} from "./modules/canvas-item";


// const and variables

const canvasNode = document.getElementById('game-field'),
      coordsStart = {
        x: "200",
        y: "290"
      },

      pathes = {
            bg: "img/india-map.svg",
            marker: "img/marker.png",
            markerPoint: "img/marker-poin.svg"
          },

      colors = {
        line: "#ffca00",
        ball: "#ca3d00",
        center: "#6e7c35",
        centerCircuit: "#313817"
      },

      drawElemSizes = {
        line: "3",
        center: "7",
        ball: "21",
        markerWidth: "20",
        markerHeight: "29"
      },

      stadiums = [
        {
          name: "Shimla",
          coords: {
            xControlOne: "205",
            yControlOne: "224",
            xControlTwo: "199",
            yControlTwo: "108",
            xEnd: "180",
            yEnd: "90"
          }
        },
        {
          name: "Kolkata",
          coords: {
            xControlOne: "270",
            yControlOne: "275",
            xControlTwo: "380",
            yControlTwo: "280",
            xEnd: "405",
            yEnd: "295"
          }
        },
        {
          name: "Raipur",
          coords: {
            xControlOne: "230",
            yControlOne: "290",
            xControlTwo: "280",
            yControlTwo: "295",
            xEnd: "295",
            yEnd: "330"
          }
        },
        {
          name: "Bhopal",
          coords: {
            xControlOne: "225",
            yControlOne: "295",
            xControlTwo: "240",
            yControlTwo: "300",
            xEnd: "245",
            yEnd: "325"
          }
        },
        {
          name: "Hyderabad",
          coords: {
            xControlOne: "230",
            yControlOne: "350",
            xControlTwo: "230",
            yControlTwo: "400",
            xEnd: "230",
            yEnd: "455"
          }
        },
        {
          name: "Bengalur",
          coords: {
            xControlOne: "180",
            yControlOne: "320",
            xControlTwo: "178",
            yControlTwo: "440",
            xEnd: "190",
            yEnd: "500"
          }
        },
        {
          name: "Mumbai",
          coords: {
            xControlOne: "175",
            yControlOne: "290",
            xControlTwo: "135",
            yControlTwo: "345",
            xEnd: "135",
            yEnd: "380"
          }
        },
        {
          name: "Silvassa",
          coords: {
            xControlOne: "135",
            yControlOne: "290",
            xControlTwo: "110",
            yControlTwo: "345",
            xEnd: "100",
            yEnd: "390"
          }
        },
        {
          name: "Gandhinag",
          coords: {
            xControlOne: "130",
            yControlOne: "275",
            xControlTwo: "80",
            yControlTwo: "290",
            xEnd: "60",
            yEnd: "310"
          }
        },
        {
          name: "Chandigar",
          coords: {
            xControlOne: "200",
            yControlOne: "230",
            xControlTwo: "180",
            yControlTwo: "150",
            xEnd: "150",
            yEnd: "120"
          }
        }
      ];

let canvasItem = new CanvasItem(canvasNode, pathes, stadiums, coordsStart, colors, drawElemSizes);