//
//  AuthenticationNetworkManager.swift
//  BankingApp_IOS
//
//  Created by Lucas Hermes on 17.06.24.
//

import Foundation

class AuthenticationNetworkManager {
    
    static let shared = AuthenticationNetworkManager()
    
    private init() {}
    
    func callLogIn(credentials: LogInRequestModel, completed: @escaping (Result<LogInResponseModel, NetworkError>) -> Void) {
        
        guard let url = URL(string: "http://localhost:8080/auth/v1/login") else {
            completed(.failure(.invalidURL))
            return;
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.httpShouldHandleCookies = true
        request.addValue("include", forHTTPHeaderField: "credentials")
        request.addValue("*/*", forHTTPHeaderField: "Accept")
        request.addValue("SESSION=foushofushofeuhs", forHTTPHeaderField: "Cookie")
        
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        request.addValue("application/json", forHTTPHeaderField: "Accept")
        
        do {
            request.httpBody = try JSONEncoder().encode(credentials)
        } catch {
            completed(.failure(.failedPayLoadEncoding))
        }
        
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
            CookieManager.shared.saveCookies(response: response)
            print(response.allHeaderFields)
            print(CookieManager.shared.getCookies(for: URL(string: "http://localhost:8080/auth/v1/checkAuth")!))
            
            do {
                let decodedResponse = try JSONDecoder().decode(LogInResponseModel.self, from: data)
                completed(.success(decodedResponse))
            } catch {
                completed(.failure(.failedPayLoadDecoding))
            }
            
        }
        
        task.resume()
            
    }
    
    func callCheckAuth(completed: @escaping (Result<LogInResponseModel, NetworkError>) -> Void) {
        
        guard let url = URL(string: "http://localhost:8080/auth/v1/checkAuth") else {
            completed(.failure(.invalidURL))
            return;
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = "GET"
        request.addValue("include", forHTTPHeaderField: "credentials")
        request.httpShouldHandleCookies = true
        request.addValue("SESSION="+CookieManager.shared.getSessionCookieValue(), forHTTPHeaderField: "Cookie")
        
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
                let decodedResponse = try JSONDecoder().decode(LogInResponseModel.self, from: data)
                print("Authorized")
                completed(.success(decodedResponse))
            } catch {
                completed(.failure(.failedPayLoadDecoding))
            }
            
        }
        
        task.resume()
            
    }
}
