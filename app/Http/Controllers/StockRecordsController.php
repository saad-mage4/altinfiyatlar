<?php

namespace App\Http\Controllers;

class StockRecordsController extends Controller
{

    /**
     * @return array
     */
    public function getRecords(): array
    {
        $api_key = env('NOISY_API_KEY');
        $urls =
            [
                'live_exchange_rates' => "https://www.nosyapi.com/apiv2/service/economy/live-exchange-rates/list",
                'calendar_date_list' => "https://www.nosyapi.com/apiv2/service/economy/calendar/date-list",
                'currency_list' => "https://www.nosyapi.com/apiv2/service/economy/currency/list",
                'currency_exchange_rate' => "https://www.nosyapi.com/apiv2/service/economy/currency/exchange-rate",
            ];

        $ch = curl_init();
        foreach ($urls as $key => $url) {
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                "X-NSYP: $api_key",
            ]);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

            $response = curl_exec($ch);
            $jsonResponse = json_decode($response, true);
            $response[$key] = $jsonResponse['data'];
        }

        curl_close($ch);

//        echo '<pre>';
//        print_r($response);
//        exit();

        return $response;
    }
}
