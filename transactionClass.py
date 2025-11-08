import http.client
import json

class transactionClass:
    def __init__(self):
        self.conn = http.client.HTTPSConnection("api.quiverquant.com")
        self.headers = {
            'Accept': "application/json",
            'Authorization': "Bearer 8811e9c3ec80c57c79b915490ff666da60e3b888"
        }

    def get_recent_trades(self, congressman_name):
        """
        Fetches the 5 most recent trades for a given congressman.
        """
        print(congressman_name)
        representative = congressman_name.replace(" ", "+")
        self.conn.request("GET", f"/beta/bulk/congresstrading?normalized=true&page=1&page_size=100&representative={representative}&nonstock=false", headers=self.headers)

        
        res = self.conn.getresponse()
        data = res.read()
        
        print(data.decode("utf-8"))
        

    def interactive_query(self):
        """
        Allows the user to query the API interactively for trades by entering a ticker and congressman name.
        """
        print("\n--- Interactive Query ---")
        ticker = input("Enter the ticker (leave blank if not needed): ")
        representative = input("Enter the representative's name (leave blank if not needed): ")
        representative = representative.replace(" ", "+")

        # Build the request
        self.conn.request("GET", f"/beta/bulk/congresstrading?normalized=true&page=1&page_size=10&representative={representative}&ticker={ticker}&nonstock=false", headers=self.headers)

        res = self.conn.getresponse()
        data = res.read()

        print("\n--- Query Results ---")
        print(data.decode("utf-8"))
        