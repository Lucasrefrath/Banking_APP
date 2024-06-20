//
//  LogInViewModel.swift
//  BankingApp_IOS
//
//  Created by Lucas Hermes on 17.06.24.
//

import Foundation

class LogInViewModel: ObservableObject {
    
    @Published var userData: LogInResponseModel?
    @Published var isPending = false
    
    @Published var username: String = "admin"
    @Published var password: String = "admin"
    private var clientLocation: String = "Europe/Berlin"
    private var clientBrowser: String = "IOS-APP"
    private var clientOS: String = "IOS"
    
    func handleLogin() {
        isPending = true
        AuthenticationNetworkManager.shared.callLogIn(credentials: LogInRequestModel(
            username: username, password: password, clientLocation: "Europe/Berlin", clientBrowser: "IOS-APP", clientOS: "IOS"
        )) { result in
            
            self.isPending = false
            
            DispatchQueue.main.async {
                switch result {
                    
                case .success(let dataResponse):
                    self.userData = dataResponse
                    AuthenticationContextHolder.shared.authenticate()
                    print(self.userData ?? "no data")
                    
                case .failure(let error):
                    print(error.localizedDescription)
                    
                }
            }
        }
    }
}
