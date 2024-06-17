//
//  LogInPage.swift
//  BankingApp_IOS
//
//  Created by Lucas Hermes on 15.06.24.
//

import Foundation
import SwiftUI

struct LogInPage: View {
    
    @ObservedObject var viewModel: LoginViewModel = LoginViewModel()
        
        var body: some View {
            VStack {
                
                Spacer()
                
                VStack {
                    TextField(
                        "enter username",
                        text: $viewModel.username
                    )
                    .autocapitalization(.none)
                    .disableAutocorrection(true)
                    .padding(.top, 20)
                    
                    Divider()
                    
                    SecureField(
                        "enter password",
                        text: $viewModel.password
                    )
                    .padding(.top, 20)
                    
                    Divider()
                }
                
                Spacer()
                
                Button(
                    action: viewModel.login,
                    label: {
                        Text("Log In")
                            .font(.system(size: 24, weight: .bold, design: .default))
                            .frame(maxWidth: .infinity, maxHeight: 60)
                            .foregroundColor(Color.white)
                            .background(Color.blue)
                            .cornerRadius(10)
                    }
                )
            }
            .padding(30)
        }
}
