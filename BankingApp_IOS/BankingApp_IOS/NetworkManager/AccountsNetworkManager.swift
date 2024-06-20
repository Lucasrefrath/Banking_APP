//
//  AccountsNetworkManager.swift
//  BankingApp_IOS
//
//  Created by Lucas Hermes on 17.06.24.
//

import Foundation

class AccountsNetworkManager {
    
    static let shared = AccountsNetworkManager()
    
    private init() {}
    
    func callGetAllAccounts(completed: @escaping (Result<[AccountDetailsModel], NetworkError>) -> Void) {
        
        guard let url = URL(string: "http://localhost:8080/api-test/v1/adminAccounts") else {
            completed(.failure(.invalidURL))
            return;
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = "GET"
        
        let task = URLSession.shared.dataTask(with: request) { data, response, error in
            if error != nil {
                completed(.failure(.failedConnection))
                return;
            }
            
            guard let response = response as? HTTPURLResponse, response.statusCode == 200 else {
                completed(.failure(.noData))
                return;
            }
            
            guard let data = data else {
                completed(.failure(.noData))
                return;
            }
            
            do {
                let decodedResponse = try JSONDecoder().decode([AccountDetailsModel].self, from: data)
                completed(.success(decodedResponse))
            } catch {
                completed(.failure(.failedPayLoadDecoding))
            }
            
        }
        
        task.resume()
            
    }
    
}
