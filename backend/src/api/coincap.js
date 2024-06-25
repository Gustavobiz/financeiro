// coincap.js

export async function getCoins() {
    
    try {
        const response = await fetch("https://api.coincap.io/v2/assets", {
            method: "GET",
            redirect: 'follow',
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json()
        return result;
    } catch (err) {
        throw err
    }
}

export async function getCoin(cripto) {
    try {
        const response = await fetch("https://api.coincap.io/v2/assets/" + cripto, {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const history = await fetch("https://api.coincap.io/v2/assets/" + cripto+"/history?interval=d1", {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.erro) {
            throw new Error("Erro ao consultar Api");
        }
        const resultJson = (await response.json()).data
        const historyJson = (await history.json()).data

        resultJson["historico"]=historyJson

        return resultJson;
    } catch (err) {
        throw err
    }
}

export async function getCoinPrice(cripto) {
    try {
        const response = await fetch("https://api.coincap.io/v2/assets/" + cripto, {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
        });
       
        if (response.erro) {
            throw new Error("Erro ao consultar Api");
        }
        const resultJson = (await response.json()).data.priceUsd
        return resultJson;
    } catch (err) {
        throw err
    }
}

