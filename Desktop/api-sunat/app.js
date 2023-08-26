"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var axios_1 = require("axios"); // librería axios
var app = (0, express_1.default)();
var PORT = 3000;
var SUNAT_API_URL = 'https://api-cpe.sunat.gob.pe'; //URL real de la API de la SUNAT
var SUNAT_TOKEN = 'eyJraWQiOiJhcGkuc3VuYXQuZ29iLnBlLmtpZDAwMSIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIyMDYwNzA0MTUwNSIsImF1ZCI6Ilt7XCJhcGlcIjpcImh0dHBzOlwvXC9hcGktY3BlLnN1bmF0LmdvYi5wZVwiLFwicmVjdXJzb1wiOlt7XCJpZFwiOlwiXC92MVwvY29udHJpYnV5ZW50ZVwvY29udHJvbGNwZVwiLFwiaW5kaWNhZG9yXCI6XCIxXCIsXCJndFwiOlwiMTAwMDAwXCJ9XX0se1wiYXBpXCI6XCJodHRwczpcL1wvYXBpLXNpcmUuc3VuYXQuZ29iLnBlXCIsXCJyZWN1cnNvXCI6W3tcImlkXCI6XCJcL3YxXC9jb250cmlidXllbnRlXC9taWdlaWd2XCIsXCJpbmRpY2Fkb3JcIjpcIjFcIixcImd0XCI6XCIxMDAwMDBcIn1dfSx7XCJhcGlcIjpcImh0dHBzOlwvXC9hcGktY3BlLnN1bmF0LmdvYi5wZVwiLFwicmVjdXJzb1wiOlt7XCJpZFwiOlwiXC92MVwvY29udHJpYnV5ZW50ZVwvZ2VtXCIsXCJpbmRpY2Fkb3JcIjpcIjFcIixcImd0XCI6XCIxMDAwMDBcIn1dfV0iLCJ1c2VyZGF0YSI6eyJudW1SVUMiOiIyMDYwNzA0MTUwNSIsInRpY2tldCI6IjEyMzgxMDQ0MjI0OTAiLCJucm9SZWdpc3RybyI6IiIsImFwZU1hdGVybm8iOiIiLCJsb2dpbiI6IjIwNjA3MDQxNTA1NDc1NzM1MjkiLCJub21icmVDb21wbGV0byI6IkFTSyBDT1JQLiBFLkkuUi5MLiIsIm5vbWJyZXMiOiJBU0sgQ09SUC4gRS5JLlIuTC4iLCJjb2REZXBlbmQiOiIwMDgzIiwiY29kVE9wZUNvbWVyIjoiIiwiY29kQ2F0ZSI6IiIsIm5pdmVsVU8iOjAsImNvZFVPIjoiIiwiY29ycmVvIjoiIiwidXN1YXJpb1NPTCI6IjQ3NTczNTI5IiwiaWQiOiIiLCJkZXNVTyI6IiIsImRlc0NhdGUiOiIiLCJhcGVQYXRlcm5vIjoiIiwiaWRDZWx1bGFyIjpudWxsLCJtYXAiOnsiaXNDbG9uIjpmYWxzZSwiZGRwRGF0YSI6eyJkZHBfbnVtcnVjIjoiMjA2MDcwNDE1MDUiLCJkZHBfbnVtcmVnIjoiMDA4MyIsImRkcF9lc3RhZG8iOiIwMCIsImRkcF9mbGFnMjIiOiIwMCIsImRkcF91YmlnZW8iOiIyMDAxMDQiLCJkZHBfdGFtYW5vIjoiMDMiLCJkZHBfdHBvZW1wIjoiMDciLCJkZHBfY2lpdSI6Ijc0MzA2In0sImlkTWVudSI6IjEyMzgxMDQ0MjI0OTAiLCJqbmRpUG9vbCI6InAwMDgzIiwidGlwVXN1YXJpbyI6IjAiLCJ0aXBPcmlnZW4iOiJJVCIsInByaW1lckFjY2VzbyI6ZmFsc2V9fSwibmJmIjoxNjkzMDY0NjYyLCJjbGllbnRJZCI6IjRhZjllYjZmLWViY2QtNDIyZi1hN2Q0LTBkZjQ0YjhmNmI4YSIsImlzcyI6Imh0dHBzOlwvXC9hcGktc2VndXJpZGFkLnN1bmF0LmdvYi5wZVwvdjFcL2NsaWVudGVzc29sXC80YWY5ZWI2Zi1lYmNkLTQyMmYtYTdkNC0wZGY0NGI4ZjZiOGFcL29hdXRoMlwvdG9rZW5cLyIsImV4cCI6MTY5MzA2ODI2MiwiZ3JhbnRUeXBlIjoicGFzc3dvcmQiLCJpYXQiOjE2OTMwNjQ2NjJ9.SJq4c7WQ9eElo_Ae8SPndnfiAMHTyTXydTu4bQf5gHSgTjbC7RCGanZyVh6eEiyqNUAwTVIKmX1Um_T9154c39k1Y5dRMInSr3gNWhfyqr_Oe4xPtAZ7wXrk2Fxy2PCM3exdx2UHiQ056QaFARYgaUjAg0BPy3R3zeg-DHXKLoyAhaasl2MRuKyy67nJWwHNEYf2oZmo6OtdIT-GHTpz_DER0f9qyio7hHds-zYERcBsoCrvOSKhWP6zlsO6qIRD3kgrf5-BMBNKsCt-QDILHIhuZUZNtbtNJtSvfv8MW9A3-aF3uVOJmPkWXTBw4Iw0GZfifBgoHDyzaAQhcV0uIQ'; // Mi token real de la SUNAT
app.use(express_1.default.json());
// Endpoint para registrar una factura
app.post('/registrar/factura', function (req, res) {
    var data = req.body;
    axios_1.default.post("".concat(SUNAT_API_URL, "/registrar/factura"), data, {
        headers: {
            Authorization: "Bearer ".concat(SUNAT_TOKEN),
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
        res.status(200).json(response.data);
    })
        .catch(function (error) {
        res.status(500).json({ error: 'Error al registrar la factura' });
    });
});
// Endpoint para registrar una boleta
app.post('/registrar/boleta', function (req, res) {
    var data = req.body;
    axios_1.default.post("".concat(SUNAT_API_URL, "/registrar/boleta"), data, {
        headers: {
            Authorization: "Bearer ".concat(SUNAT_TOKEN),
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
        res.status(200).json(response.data);
    })
        .catch(function (error) {
        res.status(500).json({ error: 'Error al registrar la boleta' });
    });
});
app.listen(PORT, function () {
    console.log("Servidor corriendo en el puerto ".concat(PORT));
});
