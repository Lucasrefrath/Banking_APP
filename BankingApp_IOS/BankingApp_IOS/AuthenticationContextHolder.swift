//
//  AuthenticationContextHolder.swift
//  BankingApp_IOS
//
//  Created by Lucas Hermes on 17.06.24.
//

import Foundation

class AuthenticationContextHolder: ObservableObject {
    
    static let shared = AuthenticationContextHolder()
    
    @Published var isAuthenticated = false
    @Published var initAuthStatusPending = true
    @Published var userDetails: LogInResponseModel = LogInResponseModel(id: 0, username: "no username", roles: ["NO ROLES"], deviceIsMobileAuthentication: false)
    
    private init() {}
    
    func authenticate() {
        isAuthenticated = true
    }
    
    func initiateCheckAuth() {
        AuthenticationNetworkManager.shared.callCheckAuth { result in
            DispatchQueue.main.async {
                switch result {
                case .success(let response):
                    self.userDetails = response
                    self.isAuthenticated = true
                case .failure(let error):
                    print(error)
                    self.isAuthenticated = false
                }
            }
        }
        initAuthStatusPending = false
    }

    
}
