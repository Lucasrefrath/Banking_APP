//
//  AuthenticationPage.swift
//  BankingApp_IOS
//
//  Created by Lucas Hermes on 15.06.24.
//

import Foundation
import SwiftUI

struct AuthenticationPage: View {
    
    @AppStorage("api-token") private var apiToken = "";
    
    
    func setToken() {
        apiToken = "hahahaha"
    }
    
    var body: some View {
        Text("Authenticate Requests")
            .navigationTitle("Authentication")
        Text(apiToken)
        Button(action: {
            setToken()
        }) {
            Text("SetToken")
        }
    }
}
