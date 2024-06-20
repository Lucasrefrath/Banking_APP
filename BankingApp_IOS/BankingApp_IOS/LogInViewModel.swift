//
//  LogInViewModel.swift
//  BankingApp_IOS
//
//  Created by Lucas Hermes on 15.06.24.
//

import Foundation

class LoginViewModel: ObservableObject {

    @Published var username: String = "admin"
    @Published var password: String = "admin"
    private var clientLocation: String = "Europe/Berlin"
    private var clientBrowser: String = "IOS-APP"
    private var clientOS: String = "IOS"

    func login() {
        LoginAction(
            parameters: LogInRequestModel(
                username: username,
                password: password,
                clientLocation: clientLocation,
                clientBrowser: clientBrowser,
                clientOS: clientOS
            )
        ).call { _ in
            // Login successful, navigate to the Home screen
        }
    }
}
